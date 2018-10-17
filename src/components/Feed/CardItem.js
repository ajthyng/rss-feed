import React from 'react'
import CardActions from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import ExternalLink from '@material-ui/icons/Launch'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import styled from 'styled-components'

const NewsCard = styled(Card)`
  min-width: 275;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CardFooter = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`

function CardItem (props) {
  const { tag, title, date, link } = props
  const openLink = () => window.open(link)
  return (
    <NewsCard>
      <CardContent style={{ flexGrow: 1 }}>
        <Typography color='textSecondary' gutterBottom>
          {tag}
        </Typography>
        <Typography gutterBottom variant='h5'>
          {title}
        </Typography>
      </CardContent>
      <CardFooter>
        <Typography component='p' style={{ paddingLeft: 12 }}>
          {dayjs(date).format('h:MMa')}
        </Typography>
        <IconButton
          onClick={openLink}
          color='inherit'
          aria-label='Open in Tab'
        >
          <ExternalLink />
        </IconButton>
      </CardFooter>
    </NewsCard>
  )
}

CardItem.defaultProps = {
  tag: 'NO TAG'
}

export default CardItem
