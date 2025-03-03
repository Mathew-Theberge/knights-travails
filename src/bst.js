class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = mergeSort(removeDuplicates(arr));
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, node = this.root) {
    if (value === undefined) throw new Error("must provide valid value");
    // this is for a special case where the main root = null
    if (this.root === null) {
      this.root = new Node(value);
      return;
      //   this is the base case
    }
    if (node === null) {
      return new Node(value);
    }

    if (node.data === value) {
      console.log("value already in tree");
      return node;
    }

    if (value > node.data) {
      node.right = this.insert(value, node.right);
    } else {
      node.left = this.insert(value, node.left);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;
    // this if block is for a very specific case where your deleting
    // the top/main root node and it only has 1 subtree if this statement
    // was not here the node skips the recursive call to set node.right
    // or node.left and goes straight to the return node.right or left
    // therefor returning the node to the main func call but never updating
    // any values
    if (value === this.root.data) {
      if (this.root.left === null && this.root.right !== null) {
        return (this.root = this.root.right);
      }
      if (this.root.right === null && this.root.left !== null) {
        return (this.root = this.root.left);
      }
      if (this.root.right === null && this.root.left === null) {
        return (this.root = null);
      }
    }

    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let closestNode = this.findMin(node);
      node.data = closestNode.data;
      node.right = this.deleteItem(closestNode.data, node.right);
    }
    return node;
  }

  findMin(node) {
    let closestRightNode = node.right;
    while (closestRightNode.left !== null && closestRightNode !== null) {
      closestRightNode = closestRightNode.left;
    }
    return closestRightNode;
  }

  find(value, node = this.root) {
    if (node === null) return;
    let currNode = node;

    while (currNode.left !== null || currNode.right !== null) {
      if (value > currNode.data) {
        currNode = currNode.right;
      } else if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        return currNode;
      }
    }
    // leaf nodes dont get checked with the while loop code
    // so we do a final check for equality before returning null
    if (currNode.data === value) {
      return currNode;
    } else return null;
  }

  levelOrderRec(callback, queue = [this.root]) {
    if (typeof callback !== "function")
      throw new Error("callback func is required");

    if (this.root === null) return null;
    if (queue.length === 0) return;
    let node = queue[0];

    callback(node);
    queue.shift();

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }

    this.levelOrderRec(callback, queue);
  }

  levelOrder(callback) {
    if (callback === undefined || typeof callback !== "function")
      throw new Error("callback func is required");

    if (this.root === null) return;

    let node = this.root;
    let queue = [node];

    while (queue.length) {
      let currNode = queue[0];
      callback(currNode);

      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
      queue.shift();
    }
  }

  inorder(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new Error("callback func is required");

    if (this.root === null) return null;
    if (node === null) return;

    this.inorder(callback, node.left);
    callback(node);
    this.inorder(callback, node.right);
  }

  preorder(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new Error("callback func is required");

    if (this.root === null) return null;
    if (node === null) return;

    callback(node);
    this.preorder(callback, node.left);
    this.preorder(callback, node.right);
  }

  postorder(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new Error("callback func is required");

    if (this.root === null) return null;
    if (node === null) return;

    this.postorder(callback, node.left);
    this.postorder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;
    let leftheight = this.height(node.left);
    let rightheight = this.height(node.right);
    return Math.max(leftheight, rightheight) + 1;
  }

  depth(node) {
    let maxHeight = this.height(this.root);
    let nodeHeight = this.height(node);
    return maxHeight - nodeHeight;
  }

  isBalanced() {
    if (this.root === null) return true;
    let node = this.root;
    let queue = [node];

    while (queue.length) {
      let currNode = queue[0];

      if (!this.isNodeBalanced(currNode)) {
        return false;
      }

      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
      queue.shift();
    }
    return true;
  }

  isNodeBalanced(node) {
    if (node.left === null) {
      if (this.height(node.right) < 1) {
        return true;
      } else {
        return false;
      }
    }
    if (node.right === null) {
      if (this.height(node.left) < 1) {
        return true;
      } else {
        return false;
      }
    }

    let leftTreeHeight = this.height(node.left);
    let rightTreeHeight = this.height(node.right);

    if (
      leftTreeHeight === rightTreeHeight ||
      leftTreeHeight === rightTreeHeight + 1 ||
      leftTreeHeight === rightTreeHeight - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    if (!this.isBalanced()) {
      let array = [];
      this.postorder((node) => {
        array.push(node.data);
      });
      array = mergeSort(removeDuplicates(array));
      this.root = this.buildTree(array, 0, array.length - 1);
    } else {
      console.log("tree is already balanced");
    }
  }
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  let leftArray = arr.slice(0, mid);
  let rightArray = arr.slice(mid);

  leftArray = mergeSort(leftArray);
  rightArray = mergeSort(rightArray);

  return merge(leftArray, rightArray);
}

function merge(left, right) {
  let sortedArray = [];
  let i = 0;
  let j = 0;

  while (left.length > i && right.length > j) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else {
      sortedArray.push(right[j]);
      j++;
    }
  }

  return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
