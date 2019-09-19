import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  nodeSelector: PropTypes.string.isRequired,
}

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
              this.setState(prevState => ({nodeList: [...this.state.nodeList, node]}));
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

Hijacker.propTypes = propTypes;

class Portal extends Component {
  render() {
    return ReactDOM.createPortal(this.props.children, this.props.node);
  }
}