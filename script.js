// A binary tree mode
function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  };
}

const numArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 45, 32];

// Build BST from sorted array
function buildTree(cleanArr, start, end) {
  // Base case
  if (start > end) {
    return null;
  }

  // GEt the middle element and make it root
  var mid = parseInt((start + end) / 2);
  var node = Node(cleanArr[mid]);

  // Recursively construct the left subtree
  // and make it left child of root
  node.left = buildTree(cleanArr, start, mid - 1);
  // Recursively construct the right subtree
  // and make it right child of root
  node.right = buildTree(cleanArr, mid + 1, end);

  return node;
}

//
function Tree(numArr) {
  // Remove duplicates and sort array
  const cleanArr = [...new Set(numArr.sort((a, b) => a - b))];

  return {
    root: buildTree(cleanArr, 0, cleanArr.length),

    // Insert new value in BST
    insert(value, root = this.root) {
      // if tree is empty, retrun a new node
      if (root == null) {
        root = Node(value);
        return root;
      }

      // Otherwise, recur down the tree
      if (value < root.data) {
        root.left = this.insert(value, root.left);
      } else if (value > root.data) {
        root.right = this.insert(value, root.right);
      }

      return root;
    },

    // Delete value from the Bst
    delete(value, root = this.root) {
      // Base case
      if (root === null) {
        return root;
      }

      // Delete node ancestors in recursive calls
      if (root.data > value) {
        root.left = this.delete(value, root.left);
      } else if (root.data < value) {
        root.right = this.delete(value, root.right);
      }

      // Where root is the node to be deleted

      // If one of the children is empty
      if (root.left === null) {
        let temp = root.right;
        root = null;
        return temp;
      } else if (root.right === null) {
        let temp = root.left;
        root = null;
        return temp;
      }
      // If both children exist
      else {
        let succParent = root;

        // Find successor
        let succ = root.right;
        while (succ.left !== null) {
          succParent = succ;
          succ = succ.left;
        }

        // Since successor is always left child of its parent
        // Make successor right child as left of its parent
        // if there is no succ, then assign succ.right to succcParent.right
        if (succParent !== root) {
          succParent.left = succ.right;
        } else {
          succParent.right = succ.right;
        }

        // Copy successor data to root
        root.data = succ.data;

        // Delete successor and return root
        succ = null;
        return root;
      }
    },

    // Find value and return node with the given value
    find(value, root = this.root) {
      // Base cases: root is null 0r value is present
      if (root === null || root.data === value) {
        return root;
      }

      // Value is greater than root"s data
      if (root.data < value) {
        return this.find(value, root.right);
      }

      return this.find(value, root.left);
    },

    // Traverse the tree in breath-level order
    levelOrder(root = this.root, visitFunction) {
      if (!root) return [];

      const result = [];
      const queue = [root];

      while (queue.length > 0) {
        // Dequeue the first node in the queue
        const current = queue.shift();

        if (visitFunction) {
          visitFunction(current.data);
        } else {
          result.push(current.data);
        }

        if (current.left) {
          queue.push(current.left);
        }
        if (current.right) {
          queue.push(current.right);
        }
      }

      return result;
    },

    // Inorder traverse of tree in depth-first order
    // Traverse left subtree the right then visit the root
    inOrder(root = this.root, visitFunction) {
      if (!root) return [];

      const printResult = [];

      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }

        if (visitFunction) {
          visitFunction(node.data);
        } else {
          printResult.push(node.data);
        }

        if (node.right) {
          traverse(node.right);
        }
      }

      traverse(root);

      return printResult;
    },

    // Preorder traverse of the tree
    // Visit the root then traverse left subtree then the right
    preOrder(root = this.root, visitFunction) {
      if (!root) return [];

      const printResult = [];

      function traverse(node) {
        if (visitFunction) {
          visitFunction(node.data);
        } else {
          printResult.push(node.data);
        }

        if (node.left) {
          traverse(node.left);
        }

        if (node.right) {
          traverse(node.right);
        }
      }

      traverse(root);

      return printResult;
    },

    // Postorder traverse of the tree
    // Traverse the left subtree then the right then visit root
    postOrder(root = this.root, visitFunction) {
      if (!root) return [];

      const printResult = [];

      function traverse(node) {
        if (node.left) {
          traverse(node.left);
        }

        if (node.right) {
          traverse(node.right);
        }

        if (visitFunction) {
          visitFunction(node.data);
        } else {
          printResult.push(node.data);
        }
      }

      traverse(root);

      return printResult;
    },

    // Print height of a node
    height(root = this.root) {
      if (root == null) return -1;

      // Recursively search in the left and right subtrees.
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);

      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      } else {
        return rightHeight + 1;
      }
    },

    // Print depth of a node
    depth(value, root = this.root, depth = 0) {
      if (!root) return -1;

      if (root.data == value) {
        return depth;
      }

      // Recursively search in the left and right subtrees.
      const leftDepth = this.depth(value, root.left, depth + 1);
      if (leftDepth != -1) {
        return leftDepth; // Node  found in the left subtree.
      }

      const rightDepth = this.depth(value, root.right, depth + 1);
      return rightDepth; // Return the result from the right subtree.
    },

    // Check if Tree is balanced
    isBalanced(root = this.root) {
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);
      const diff = Math.abs(leftHeight - rightHeight);
      return diff < 2 ? "true" : "false";
    },

    // Rebalance the un balanced tree
    rebalance(root = this.root) {
      if (root === null) return;
      const sortedValues = [...new Set(this.inOrder().sort((a, b) => a - b))];
      console.log(sortedValues);
      this.root = buildTree(sortedValues, 0, sortedValues.length - 1);
    },
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = Tree(numArr);
tree.insert(11);
tree.insert(12);
tree.insert(13);
console.log("insert: ", tree.insert(6));

tree.delete(3);
console.log("find: ", tree.find(9));

console.log("levelOrder:", tree.levelOrder());

console.log("inOrder:", tree.inOrder());
console.log("preOrder:", tree.preOrder());
console.log("postOrder:", tree.postOrder());

console.log("Height:", tree.height());
console.log("Depth:", tree.depth(45));

console.log("isBalanced:", tree.isBalanced());
tree.rebalance();
console.log("isBalanced:", tree.isBalanced());

prettyPrint(tree.root);
