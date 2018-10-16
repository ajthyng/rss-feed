import React, { PureComponent } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 300px;
  align-items: flex-start;
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: ${props => (props.hover ? props.theme.primaryVariant : props.theme.primary)};
  transition: transform 150ms ease-in-out;
  
  transform: scale(${({ hover }) => (hover ? 1.02 : 1)}) translateZ(0) perspective(1px);
  filter: blur(0);
`

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  text-align: start;
  color: ${props => (props.hover ? props.theme.textVariant : props.theme.text)};
`

const Posted = styled.p`
  font-size: 0.8em;
  text-align: center;
  color: ${props => (props.hover ? props.theme.textVariant : props.theme.text)};
`

const ordinalSuffix = i => {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

class Item extends PureComponent {
  state = {
    hover: false
  }

  onClick = () => {
    const { link } = this.props
    window.open(link)
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  render () {
    const { title, date } = this.props
    const { hover } = this.state
    const day = dayjs(date).format('D')
    return (
      <Container
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        hover={hover}
      >
        <Title hover={hover}>{title}</Title>
        <Posted hover={hover}>
          {dayjs(date).format(
            `HH:mma - MMMM [${ordinalSuffix(parseInt(day))}], YYYY`
          )}
        </Posted>
      </Container>
    )
  }
}

Item.defaultProps = {
  title: 'No Title',
  description: 'No Description'
}

export default Item
