import React from 'react'
import { Image, Container, Item, Button, Icon, Dimmer, Loader, Segment, Message } from 'semantic-ui-react'
import axios from 'axios';



// const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

class TicketMarketplace extends React.Component{

  state = {
    loading: false,
    error: null,
    data: []
  }

  componentDidMount() {
    this.setState({ loading: true})
    axios.get('/some-url')
    .then(res => {
      this.setState({ data: res.data, loading: false})
    })
    .catch(error => {
      this.setState({error: error, loading: false})
    })

  }
    render() {
    const {data, error, loading} = this.state;
    return (
    <Container>
      {error && (
        <Message
          error
          header="There was some errors with your submission"
          content={JSON.stringify(error)}
        />
        )}
      {loading && (
        <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment>
      )}
      <Item.Group divided>
        <Item>
          <Item.Image src='/images/wireframe/image.png' />
          <Item.Content>
            <Item.Header>Arrowhead Valley Camp</Item.Header>
            <Item.Meta>
              <span className='price'>$1200</span>
              <span className='stay'>1 Month</span>
            </Item.Meta>
            <Item.Description>Hello!</Item.Description>
            <Item.Extra>
              <Button primary floated="right" icon labelPosition='right' >
                Add to cart
                <Icon name="cart plus" />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      </Container>
      )
}
}
export default TicketMarketplace;
