import React, { Fragment } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fab, far)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  PinterestShareButton
} from 'react-share';



export default class ShareButtons extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="social-share is-pulled-right">
				<p>Compartir página</p>
				<ul className="is-flex is-pulled-right">
					<li>
						<FacebookShareButton url={this.props.shareUrl}>
							<FontAwesomeIcon icon={[`fab`, 'facebook-f']}  />
						</FacebookShareButton>
					</li>
					<li>
						<TwitterShareButton url={this.props.shareUrl}>
							<FontAwesomeIcon icon={[`fab`, 'twitter']} />						
						</TwitterShareButton>
					</li>
					<li>
						<EmailShareButton url={this.props.shareUrl}>
							<FontAwesomeIcon icon={[`far`, 'envelope']} />						
						</EmailShareButton>
					</li>
					<li>
						<PinterestShareButton media={this.props.pageDescription} url={this.props.shareUrl}>
							<FontAwesomeIcon icon={[`fab`, 'pinterest']} />						
						</PinterestShareButton>
					</li>
				</ul>
			</div>
		)
	}
}