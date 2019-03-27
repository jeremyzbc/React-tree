import React, { Component } from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: props.tree
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      tree: nextProps.source
    };
  }

  updateTreeByBranchId = (tree, id, callback) => {
    this.find = false;
    return tree.map(branch => {
      if (this.find) {
        return branch;
      } else if (branch.id == id) {
        this.find = true;
        return callback(branch);
      } else if (branch.children !== undefined && branch.children.length > 0) {
        branch.children = this.updateTreeByBranchId(
          branch.children,
          id,
          callback
        );
        return branch;
      }
      return branch;
    });
  };

  expandToggle = id => {
    const callback = branch => {
      branch.isExpand = !branch.isExpand;
      return branch;
    };
    const tree = this.updateTreeByBranchId(this.state.tree, id, callback);
    this.setState({ tree });
  };

  selectToggle = id => {
    const callback = branch => {
      branch.isSelect = !branch.isSelect;

      // select/unselect parent branch will select/unselect all children branch
      if (branch.children !== undefined && branch.children.length > 0) {
        branch.children = this.updateChildrenFromParent(branch);
      }
      return branch;
    };
    let tree = this.updateTreeByBranchId(this.state.tree, id, callback);

    // select/unselect child branch may affect select/unselect parent branch
    tree = this.updateParentFromChildren(tree);

    // fire event for parent Component once tree selection is updated
    this.setState({ tree }, () => {
      if (typeof this.props.onTreeChange === 'function')
        this.props.onTreeChange(tree);
    });
  };

  updateChildrenFromParent = parentBranch =>
    parentBranch.children.map(childBranch => {
      childBranch.isSelect = parentBranch.isSelect;
      if (
        childBranch.children !== undefined &&
        childBranch.children.length > 0
      ) {
        childBranch.children = this.updateChildrenFromParent(childBranch);
      }
      return childBranch;
    });

  updateParentFromChildren = tree => {
    // select one of child branches will select parent branch, unselect all child branches will unselect parent branch
    return tree.map(branch => {
      if (branch.children !== undefined && branch.children.length > 0) {
        branch.children = this.updateParentFromChildren(branch.children);

        if (branch.children.every(childBranch => !childBranch.isSelect)) {
          branch.isSelect = false;
        } else {
          branch.isSelect = true;
        }
      }
      return branch;
    });
  };

  makeTree = tree => (
    <div style={{ marginLeft: '1rem' }}>
      {tree.map(branch => (
        <div key={branch.id}>
          {this.props.selectable ? (
            <input
              type="checkbox"
              checked={branch.isSelect}
              onChange={() => this.selectToggle(branch.id)}
            />
          ) : null}
          <span>{branch.label}</span>
          {branch.children && branch.children.length > 0 ? (
            branch.isExpand ? (
              <>
                <ExpandLess onClick={() => this.expandToggle(branch.id)} />
                {this.makeTree(branch.children)}
              </>
            ) : (
              <ExpandMore onClick={() => this.expandToggle(branch.id)} />
            )
          ) : null}
        </div>
      ))}
    </div>
  );

  render() {
    return this.makeTree(this.state.tree);
  }
}

Tree.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired
};
