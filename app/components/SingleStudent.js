import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SingleStudent extends Component {
	constructor() {
		super()
		this.state = {
			student: {},
			campus: {},
			campuses: [],
			firstName: '',
			lastName: '',
			email: '',
			gpa: 3.3,
			campusId: 1
		}

		this.editStudent = this.editStudent.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
		this.handleChangeLastName = this.handleChangeLastName.bind(this)
		this.handleChangeEmail = this.handleChangeEmail.bind(this)
		this.handleChangeGPA = this.handleChangeGPA.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
	}

	componentDidMount() {
		const studentId = this.props.match.params.studentId

		axios.get(`/api/students/${studentId}`)
			.then(res => res.data)
			.then(student => this.setState({ student: student, campus: student.campus }))

		axios.get('/api/campuses')
			.then(res => res.data)
			.then(campuses => this.setState({ campuses }))
	}

	editStudent(firstName, lastName, email, gpa, campusId) {
	  const studentId = this.props.match.params.studentId
	  
  	axios.put(`/api/students/${studentId}`, {
  		firstName: firstName,
  		lastName: lastName,
  		email: email,
  		gpa: gpa,
  		campusId: campusId
  	})
  	.then(res => res.data)
  	.then(student => this.setState({ student }))

		axios.get(`/api/students/${studentId}`)
			.then(res => res.data)
			.then(student => this.setState({ student: student, campus: student.campus }))
  }

  handleChangeFirstName(event) {
  	this.setState({ firstName: event.target.value })
  }

  handleChangeLastName(event) {
  	this.setState({ lastName: event.target.value })
  }

  handleChangeEmail(event) {
  	this.setState({ email: event.target.value })
  }

  handleChangeGPA(event) {
  	this.setState({ gpa: event.target.value })
  }

  handleSelect(event) {
  	this.setState({ campusId: event.target.value })
  }

  handleSubmit(event) {
  	event.preventDefault()
  	this.editStudent(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa, this.state.campusId)
  	this.setState({ firstName: '', lastName: '', email: '', gpa: 3.3, campusId: 1 })
  }

	render() {
		const student = this.state.student
		const campus = this.state.campus
		const campuses = this.state.campuses

		return(
			<div>
				<p>
					<Link to='/campuses'>CAMPUSES</Link>
				</p>
				<p>
					<Link to='/students'>STUDENTS</Link>
				</p>
				<h1>{student.name}</h1>
				<h3>E-mail: {student.email}</h3>
				<h3>GPA: {student.gpa}</h3>
				<h3>Campus: <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
					<legend>Edit Student</legend>
					<div>
						<input type="text" onChange={this.handleChangeFirstName} value={this.state.firstName} placeholder="First Name"/>
					</div>
					<div>
						<input type="text" onChange={this.handleChangeLastName} value={this.state.lastName} placeholder="Last Name"/>
					</div>
					<div>
						<input type="text" onChange={this.handleChangeEmail} value={this.state.email} placeholder="E-mail"/>
					</div>
					<div>
						<input type="text" onChange={this.handleChangeGPA} value={this.state.gpa} placeholder="GPA"/>
					</div>
					<select onChange={this.handleSelect}>
					{
						campuses.map(campus => {
							return (
								<option value={campus.id} key={campus.id}>{campus.name}</option>
							)
						})
					}
					</select>
					<div>
						<button type="submit">Edit Current Student</button>
					</div>
					</fieldset>
				</form>
			</div>
		)
	}
}