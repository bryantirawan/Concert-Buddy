import React, {useEffect, useState} from 'react';

import {
  Container,
  Dimmer,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Button,
  Icon
} from "semantic-ui-react";

function Tickets() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const url = "http://localhost:8090/api/tickets/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json['tickets']))
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
    console.log(data);
  }, [data]);

    return (
      <Container>
        <Item.Group divided>
          {data.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image />
                <Item.Content>
                  <Item.Header>
                    {item.concert.artist}
                  </Item.Header>
                  <Item.Meta>
                    {item.price}
                  </Item.Meta>
                  <Item.Extra>
                    <Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }


export default Tickets;
