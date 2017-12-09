import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SingleCampus extends Component {
	constructor() {
		super()
		this.state = {
			campus: {},
			students: [],
			name: '',
			description: ''
		}

		this.editCampus = this.editCampus.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.handleChangeDescription = this.handleChangeDescription.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const campusId = this.props.match.params.campusId

		axios.get(`/api/campuses/${campusId}`)
    		.then(res => res.data)
    		.then(campus => this.setState({ campus }))

    axios.get('/api/students')
    	.then(res => res.data)
    	.then(students => students.filter(student => student.campusId === +campusId))
    	.then(students => this.setState({ students }))
	}

	editCampus(name, description) {
		const campusId = this.props.match.params.campusId

		axios.put(`/api/campuses/${campusId}`, {
			name,
			description
		})
			.then(res => res.data)
			.then(campus => this.setState({ campus }))
	}

	handleChangeName (event) {
    this.setState({ name: event.target.value })
  }

  handleChangeDescription (event) {
  	this.setState({ description: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.editCampus(this.state.name, this.state.description)
    this.setState({ name: '', description: '' });
  }

	render() {
		const campus = this.state.campus
		const students = this.state.students
		const imageUrl = this.state.campus.imageUrl

		return(
			<div>
				<p>
					<Link to='/campuses'>CAMPUSES</Link>
				</p>
				<p>
					<Link to='/students'>STUDENTS</Link>
				</p>
				<h1>{campus.name}</h1>
				<img src={imageUrl}></img>
				<h3>Description: {campus.description}</h3>
				<h3>Students: </h3>
				<div>
				{
					students.map(student => {
						return (
							<div key={student.id}>
							<Link to={`/students/${student.id}`}>{student.name}</Link>
							</div>
						)
					})
				}
				</div>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
					<legend>Edit Campus</legend>
					<div>
						<input type="text" onChange={this.handleChangeName} value={this.state.name} placeholder="Campus Name"/>
					</div>
					<div>
						<input type="text" onChange={this.handleChangeDescription} value={this.state.description} placeholder="Campus Description" />
					</div>
					<div>
						<button type="submit" disabled={this.state.name.length < 1}>Edit Current Campus</button>
					</div>
					</fieldset>
				</form>
			</div>
		)
	}
}