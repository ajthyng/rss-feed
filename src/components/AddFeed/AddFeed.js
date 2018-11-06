import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FormControl } from '@material-ui/core'
import { actions } from 'mirrorx'

class AddFeed extends PureComponent {
  state = {
    url: '',
    tag: ''
  }

  subscribe = () => {
    const { url, tag } = this.state
    actions.urls.addFeed({ url, tag })
    const { handleClose } = this.props
    handleClose && handleClose()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { open, handleClose } = this.props
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby='add-rss-feed'>
        <DialogTitle id='add-rss-feed-title'>Add an RSS Feed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get regular updates on custom content, add your RSS feed's URL below
          </DialogContentText>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin='normal'
              id='rssURL'
              label='rss url'
              type='email'
              name='url'
              onChange={this.handleChange}
              value={this.state.url}
            />
            <TextField
              margin='normal'
              id='tag'
              label='tag'
              type='text'
              name='tag'
              onChange={this.handleChange}
              value={this.state.tag}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.subscribe} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddFeed
