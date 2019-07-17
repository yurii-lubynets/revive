import React, { PureComponent } from 'react'

import styles from '../UserContainer.module.css'

class ResizableTextarea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      rows: 1,
      minRows: 1,
      maxRows: 4,
    }
  }
  componentDidUpdate() {
    if (!this.props.value) {
      this.textInput.focus()
      this.setState({
        rows: 1,
      })
    }
  }
	
  handleChange = event => {
    this.props.onChange(event)
    const textareaLineHeight = 24
    const { minRows, maxRows } = this.state
  
    const previousRows = event.target.rows
    event.target.rows = minRows

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }
    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows,
    })
  }

  render() {
    const { rows } = this.state
    const { value, placeholder } = this.props
    return (
      <textarea
        ref={el => { this.textInput = el}}
        rows={rows}
        id="text"
        type="text"
        className={styles.textInput}
        value={value || ''}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    )
  }
}
export default ResizableTextarea