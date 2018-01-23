import React from 'react'

class LoadingSpinner extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={"loader-base" + (!this.props.showLoader ? " hide-element" : "") }>
				<div className="loader"></div>
			</div>
		)
	}
}

module.exports = LoadingSpinner
