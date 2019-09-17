import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Hijacker extends Component {
  state = {
    nodeList: [],
  }

  componentDidMount() {
    this.mounted = true;

    const nodeList = document.querySelectorAll(this.props.nodeSelector);
    
    if (nodeList.length > 0 && this.mounted) {
      this.setState({
        nodeList,
      });
    }

    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const newNodes = mutation.addedNodes;
        newNodes.forEach(node => {
          if (this.mounted && node.classList) {
              this.setState(prevState => ({nodeList: [node]}));
          }
        });
      });
    });
    
    mutationObserver.observe(document.body, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const nodeList = [...this.state.nodeList];

    const portal = (nodeList.length > 0) ? nodeList.map((node, i) =>
      (
        <Portal key={ i } node={ node }>
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