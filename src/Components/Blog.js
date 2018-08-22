import React from "react";
import Post from "./Post";

class Blog extends React.Component {
  state = {
    blogs: {
      post1: {
        title: "Post 1",
        subTitle: "subTitle 1",
        description:
          "El presidente de Estados Unidos, Donald Trump, ha acuñado un nuevo concepto en su defensa, 'el crimen no es un crimen', como parte de su contraataque después de que el martes su ex abogado, Michael Cohen, reconociese que le había dado instrucciones durante la campaña presidencial para comprar el silencio de la actriz porno Stormy ",
        imagePosition: "right"
      },
      post2: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description:
          "Michael Cohen no sólo admitió por primera vez esta coordinación con el presidente, sino que además se declaró culpable de evasión de impuestos, fraude bancario y violación de la ley electoral. Minutos antes, el ex jefe de la campaña de Trump, Paul Manafort, había sido hallado culpable de ocho cargos de fraude fiscal y bancario.",
        imagePosition: "left"
      },
      post3: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post4: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      },
      post5: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post6: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      },
      post7: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post8: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      },
      post9: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post10: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      },
      post11: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post12: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      },
      post13: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "right"
      },
      post14: {
        title: "Post 2",
        subTitle: "subTitle 2",
        description: "description 2",
        imagePosition: "left"
      }
    }
  };

  componentDidMount() {
    const name = this.props.location.pathname;
    this.props.updateActive(name.substr(name.indexOf("/")+1).toLowerCase());
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <br />
          {Object.keys(this.state.blogs).map(key => (
            <div className="col-12" key={key}>
              <Post key={key} index={key} blog={this.state.blogs[key]} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Blog;
