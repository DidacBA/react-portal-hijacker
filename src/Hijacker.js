import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Hijacker extends Component {
  state = {
    nodeList: [],
  }

  componentDidMount() {
    this.mounted = true;

    const nodeList = document.querySelectorAll(`.${this.props.nodeSelector}`);
    
    if (nodeList.length > 0 && this.mounted) {
      this.setState({
        nodeList,
      });
    }

    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const newNodes = mutation.addedNodes;

        newNodes.forEach(node => {
          if (this.mounted && node.classList && node.classList.contains(`${this.props.nodeSelector}`)) {
              let nodeObject = {
                node,
                nodeSize: node.getBoundingClientRect()
              };
              this.setState(prevState => ({
                nodeList: [...this.state.nodeList, nodeObject],
              }));
          }
        });
      });
    });
    
    this.mutationObserver.observe(document.body, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.mutationObserver.disconnect;
  }

  render() {
    const nodeList = [...this.state.nodeList];

    const portal = (nodeList.length > 0) ? nodeList.map((nodeObject, i) =>
      (
        <Portal key={ i } node={ nodeObject.node } nodeSize={ nodeObject.nodeSize }>
          { this.props.children }
        </Portal>
      )
    ) :
    null;

    return <>
      { portal }
    </>
  }
}

class Portal extends Component {
  render() {
    return ReactDOM.createPortal(this.props.children, this.props.node);
  }
}