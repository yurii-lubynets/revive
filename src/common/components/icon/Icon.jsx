import React from 'react'

import Facebook from './social/Facebook'
import Instagram from './social/Instagram'
import Linkedin from './social/Linkedin'
import Telegram from './social/Telegram'
import Twitter from './social/Twitter'

import FacebookLogo from './social/FacebookLogo'
import GoogleLogo from './social/GoogleLogo'

import FacebookLogoDisabled from './social/FacebookLogoDisabled'
import GoogleLogoDisabled from './social/GoogleLogoDisabled'

import AccountInfo from './user/AccountInfo'
import SecuritySettings from './user/SecuritySettings'
import Check from './user/Check'
import Envelope from './user/Envelope'
import Messages from './user/Messages'

import ArrowRight from './ArrowRight'
import OpenNewTab from './OpenNewTab'
import SendIcon from './SendIcon'
import Location from './Location'
import Error from './Error'

import Info from './Info'

import Arrow from './Arrow'
import Private from './Private'
import Delete from './Delete'

const Icon = props => {
  switch(props.name) {
    case 'Facebook':
      return <Facebook {...props} />
    case 'Instagram':
      return <Instagram {...props} />
    case 'Linkedin':
      return <Linkedin {...props} />
    case 'Telegram':
      return <Telegram {...props} />
    case 'Twitter':
      return <Twitter {...props} />

    case 'FacebookLogo':
      return <FacebookLogo {...props} />
    case 'GoogleLogo':
      return <GoogleLogo {...props} />
    case 'FacebookLogoDisabled':
      return <FacebookLogoDisabled {...props} />
    case 'GoogleLogoDisabled':
      return <GoogleLogoDisabled {...props} />
    case 'account':
      return <AccountInfo {...props} />
    case 'security':
      return <SecuritySettings {...props} />
    case 'check':
      return <Check {...props} />
    case 'envelope':
      return <Envelope {...props} />
    case 'messages':
      return <Messages {...props} />

    case 'arrow-right':
      return <ArrowRight {...props} />
    case 'arrow':
      return <Arrow {...props} />
    case 'private':
      return <Private {...props} />
    case 'delete':
      return <Delete {...props} />
    case 'open-new-tab':
      return <OpenNewTab {...props} />
    case 'send-icon':
      return <SendIcon {...props} />
    case 'location': 
      return <Location {...props} />
    case 'error': 
      return <Error {...props} />

    case 'info': 
      return <Info {...props} />

    default:
      return null
  }
}
export default Icon