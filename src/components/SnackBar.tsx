import * as Mui from '@mui/material'
import { useEffect, useState } from 'react'
import useSnackBar from '../hooks/useSnackBar'


function SnackBar() {  
  const { currentSnackBarMessage } = useSnackBar()

  const [isOpen, setIsOpen] = useState(false)

  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof currentSnackBarMessage !== 'undefined') {
      setIsOpen(true)
      setMessage(currentSnackBarMessage.text)
    } else {
      setIsOpen(false)
    }
  }, [currentSnackBarMessage])

  const handleCloseSnackBar = () => {
    setIsOpen(false)
  }

  return (
    <Mui.Snackbar
      open={isOpen}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleCloseSnackBar}
      message={message}
    />
  )
}

export default SnackBar
