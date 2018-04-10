import React from "react";
import { Sunburst, Hint } from "react-vis";

import { MessageService } from './Message.Service';

const initialData = {
  title: "root",
  label: "root",
  color: "#000000",
  children: [
    {
      title: "A",
      color: "#646464",
      children: [
        {
          title: "a1",
          label: "a1",
          color: "#ff0000",
          children: [
            { title: "a1.1", label: "a1.1", color: "#898989", size: 100 },
            { title: "a1.2", label: "a1.2", color: "#898989", size: 200 },
            { title: "a1.3", label: "a1.3", color: "#898989", size: 300 }
          ]
        },
        {
          title: "a2",
          label: "a2",
          color: "#00ff00",
          children: [
            { title: "a2.1", label: "a2.1", color: "#898989", size: 400 },
            { title: "a2.2", label: "a2.2", color: "#898989", size: 500 },
            { title: "a2.3", label: "a2.3", color: "#898989", size: 600 }
          ]
        },
        {
          title: "a3",
          label: "a3",
          color: "#0000ff",
          children: [
            { title: "a3.1", label: "a3.1", color: "#898989", size: 20 },
            { title: "a3.2", label: "a3.2", color: "#898989", size: 40 },
            { title: "a3.3", label: "a3.3", color: "#898989", size: 80 }
          ]
        }
      ]
    }
  ]
};

/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ["root"];
  }
  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

export default class WesleySunburst extends React.Component {
  state = {
    data: initialData
  };

  constructor(props) {
    super(props);
    this.service = new MessageService("http://localhost:5000");
  }

  componentDidMount() {
    // console.log("WesleySunburst#componentDidMount");
    this.service.getDurationTree().then(response => {
      console.log(response);
      this.setState({
        data: response
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <section className="mw8 center pa3 ph5-ns">
        <Sunburst
          animation="true"
          hideRootNode
          colorType="literal"
          data={data}
          height={800}
          width={800}
          style={{
            stroke: "#ddd",
            strokeOpacity: 0.3,
            strokeWidth: "2"
          }}
          onValueMouseOver={node => {
            console.log(node.title);
          }}
          onValueClick={(node, domEl) => {
            this.setState({
              data: node
            });
            setTimeout(() => {
              this.setState(node.parent);
            }, 3000);
          }}
        />
      </section>
    );
  }

  updateData(node) {}

  drillDown(dataTree) {
    console.log("drilldown to", dataTree);
    this.setState({
      data: dataTree
    });
  }

  climbUp(dataTree) {
    this.setState({
      data: dataTree
    });
  }
}
