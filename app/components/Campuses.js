import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Campuses extends Component {

	constructor() {
		super()
		this.state = {
			campuses: [],
			name: '',
			description: ''
		}

		this.addCampus = this.addCampus.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.handleChangeDescription = this.handleChangeDescription.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
	  axios.get('/api/campuses')
	    .then(res => res.data)
	    .then(campuses => this.setState({ campuses }))
  }

  addCampus(name, description) {
  	axios.post('/api/campuses', {
  		name,
  		description
  	})
  	.then(res => res.data)
  	.then(campus => this.setState({ campuses: [...this.state.campuses, campus] }))

  	axios.get('/api/campuses')
  		.then(res => res.data)
  		.then(campuses => this.setState({ campuses }))
  }

  handleDelete(event) {
  	event.preventDefault()
  	const campusId = event.target.value
  	axios.delete(`/api/campuses/${campusId}`)
  		.then(res => {
  			const remainingCampuses = this.state.campuses.filter(campus => campus.id !== +campusId)
  			this.setState({ campuses: remainingCampuses })
  		})
  }

  handleChangeName (event) {
    this.setState({ name: event.target.value })
  }

  handleChangeDescription (event) {
  	this.setState({ description: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.addCampus(this.state.name, this.state.description)
    this.setState({ name: '', description: '' });
  }

	render() {
		const campuses = this.state.campuses

		return (
			<div>
				<p>
					<Link to='/campuses'>CAMPUSES</Link>
				</p>
				<p>
					<Link to='/students'>STUDENTS</Link>
				</p>

				<h1>Campuses:</h1>
				<table>
				<thead>
					<tr>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>DELETE</th>
					</tr>
				</thead>
				<tbody>
					{
						campuses.map(campus => {
							return (
								<tr key={campus.id}>
									<td><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></td>
									<td>{campus.description}</td>
									<td><button type="button" className="delete" onClick={this.handleDelete} value={campus.id}>X</button></td>
								</tr>
							)
						})
					}
				</tbody>
				</table>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
					<legend>New Campus</legend>
					<div>
						<input type="text" onChange={this.handleChangeName} value={this.state.name} placeholder="Campus Name"/>
					</div>
					<div>
						<input type="text" onChange={this.handleChangeDescription} value={this.state.description} placeholder="Campus Description" />
					</div>
					<div>
						<button type="submit" disabled={this.state.name.length < 1}>Create A New Campus</button>
					</div>
					</fieldset>
				</form>
			</div>
		)
	}
}