import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
  Fa
} from "mdbreact";

const Post = props => {
  if (props.blog.imagePosition === "left") {
    return (
      <Card className="mt-5">
        <div className="row">
          <div className="col-4">
            <CardImage
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
            />
          </div>
          <div className="col">
            <CardBody className="mx-auto">
              <CardTitle>{props.blog.title}</CardTitle>
              <CardText>{props.blog.description}</CardText>
              <div className="row justify-content-end">
                <Button href="#">
                  Read more <Fa icon="arrow-right" className="ml-1" />
                </Button>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    );
  } else {
    return (
      <Card className="mt-3">
        <div className="row">
          <div className="col">
            <CardBody className="mx-auto">
              <CardTitle>{props.blog.title}</CardTitle>
              <CardText>{props.blog.description}</CardText>
              <div className="row justify-content-start">
                <Button href="#">
                  Read more <Fa icon="arrow-right" className="ml-1" />
                </Button>
              </div>
            </CardBody>
          </div>
          <div className="col-4">
            <CardImage
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
            />
          </div>
        </div>
      </Card>
    );
  }
};

export default Post;
