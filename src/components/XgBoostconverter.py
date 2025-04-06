"""
XGBoost Model to JSON Converter

This script converts an XGBoost model to a JSON format that can be loaded
in a web browser for client-side inference.

Requirements:
- Python 3.6+
- xgboost
- scikit-learn (if using)
- pandas (if using)
- numpy

Usage:
1. Train your XGBoost model
2. Run this script to convert it to JSON
3. Place the JSON file in your web app's public/models directory
"""

import os
import json
import numpy as np
import xgboost as xgb

# IMPORTANT: Replace with your actual model file
MODEL_PATH = 'your_xgboost_model.json'  # or .model or any format you saved
OUTPUT_PATH = 'web_xgboost_model.json'

def convert_xgboost_to_json(model_path, output_path):
    """
    Convert an XGBoost model to a JSON format that can be used in a web browser.
    
    Args:
        model_path: Path to the saved XGBoost model
        output_path: Path to save the JSON output
    """
    print(f"Loading model from {model_path}...")
    
    # Load the model (adjust based on how you saved your model)
    if model_path.endswith('.json'):
        # Model was saved in JSON format
        model = xgb.Booster()
        model.load_model(model_path)
    elif model_path.endswith('.model') or model_path.endswith('.bin'):
        # Model was saved in binary format
        model = xgb.Booster()
        model.load_model(model_path)
    else:
        # Assume it's a pickle file of a trained model
        import pickle
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
            # If this is a scikit-learn wrapper rather than a direct booster
            if hasattr(model, 'get_booster'):
                model = model.get_booster()
    
    # Get the model parameters
    params = model.get_params()
    
    # Get the number of trees
    num_trees = model.num_boosted_rounds()
    
    # Get the model dump as list of strings (one per tree)
    model_dump = model.get_dump()
    
    # Parse tree structures from the dump
    trees = []
    for i, tree_str in enumerate(model_dump):
        # Parse the tree string into a more usable format
        parsed_tree = parse_tree(tree_str)
        trees.append(parsed_tree)
    
    # Create a model structure that can be used for inference in JavaScript
    web_model = {
        'name': os.path.basename(model_path),
        'objective': params.get('objective', 'binary:logistic'),
        'base_score': params.get('base_score', 0.5),
        'num_trees': num_trees,
        'num_feature': model.num_features(),
        'trees': trees
    }
    
    # Save as JSON
    with open(output_path, 'w') as f:
        json.dump(web_model, f, indent=2)
    
    print(f"Model successfully converted and saved to {output_path}")
    
    # Report model details
    print(f"Model statistics:")
    print(f"- Number of trees: {num_trees}")
    print(f"- Number of features: {model.num_features()}")
    print(f"- Model size (JSON): {os.path.getsize(output_path) / 1024:.2f} KB")

def parse_tree(tree_str):
    """
    Parse the XGBoost tree dump string into a structured format.
    
    Args:
        tree_str: String representation of a tree from XGBoost dump
    
    Returns:
        Dictionary representing the tree structure
    """
    # Split the string into lines and parse each node
    tree = {}
    nodes = {}
    
    # Process each line in the tree dump
    for line in tree_str.splitlines():
        line = line.strip()
        if not line:
            continue
        
        # Extract node ID
        node_id_end = line.find(':')
        if node_id_end == -1:
            continue
        
        node_id = int(line[:node_id_end])
        content = line[node_id_end + 1:].strip()
        
        # Check if this is a leaf node
        if content.startswith('leaf='):
            # Extract leaf value
            leaf_value = float(content[5:])
            nodes[node_id] = {
                'node_id': node_id,
                'leaf': True,
                'value': leaf_value
            }
        else:
            # Parse split node - format: [feature_name] < [split_value] yes=[left_child] no=[right_child]
            feature_end = content.find('<')
            if feature_end == -1:
                continue
            
            feature_name = content[:feature_end].strip()
            
            # Extract feature index instead of name if possible
            try:
                feature_index = int(feature_name[1:]) if feature_name.startswith('f') else feature_name
            except:
                feature_index = feature_name
                
            # Find split value
            split_start = feature_end + 1
            split_end = content.find(' ', split_start)
            if split_end == -1:
                continue
            
            split_value = float(content[split_start:split_end])
            
            # Find child nodes
            yes_part = content.find('yes=')
            no_part = content.find('no=')
            
            if yes_part == -1 or no_part == -1:
                continue
            
            yes_start = yes_part + 4
            yes_end = content.find(' ', yes_start)
            yes_child = int(content[yes_start:yes_end if yes_end != -1 else None])
            
            no_start = no_part + 3
            no_end = content.find(' ', no_start)
            no_child = int(content[no_start:no_end if no_end != -1 else None])
            
            # Create node object
            nodes[node_id] = {
                'node_id': node_id,
                'leaf': False,
                'feature': feature_index,
                'split': split_value,
                'yes': yes_child,
                'no': no_child
            }
    
    # Add root node to tree
    tree = {
        'nodes': nodes,
        'root': 0  # Root node is typically 0
    }
    
    return tree

def main():
    # Convert the model
    convert_xgboost_to_json(MODEL_PATH, OUTPUT_PATH)
    
    print("\nNext steps:")
    print("1. Copy the JSON file to your web app's public/models directory")
    print("2. In ModelHandler.ts, make sure the modelPath points to the correct location")
    print("3. Test the model integration in your application")

if __name__ == "__main__":
    main()