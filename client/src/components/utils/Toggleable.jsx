import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Toggleable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <Box sx={{ mt: 2 }}>
      {!visible && (
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          sx={{ mb: 2 }}
        >
          {buttonLabel}
        </Button>
      )}
      {visible && (
        <Box sx={{ mt: 2 }}>
          {children}
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
