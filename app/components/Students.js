import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Students extends Component {
	constructor() {
		super()
		this.state = {
			campuses: [],
			students: [],
			firstName: '',
			lastName: '',
			email: '',
			gpa: 3.3,
			campusId: 1
		}

		this.addStudent = this.addStudent.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
		this.handleChangeLastName = this.handleChangeLastName.bind(this)
		this.handleChangeEmail = this.handleChangeEmail.bind(this)
		this.handleChangeGPA = this.handleChangeGPA.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
	}

	componentDidMount() {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => this.setState({ students }))

    axios.get('/api/campuses')
    	.then(res => res.data)
    	.then(campuses => this.setState({ campuses }))
  }

  addStudent(firstName, lastName, email, gpa, campusId) {
  	axios.post('/api/students', {
  		firstName: firstName,
  		lastName: lastName,
  		email: email,
  		gpa: gpa,
  		campusId: campusId
  	})
  	.then(res => res.data)

  	axios.get('/api/students')
  		.then(res => res.data)
  		.then(students => this.setState({ students }))
  }

  handleDelete(event) {
  	event.preventDefault()
  	const studentId = event.target.value
  	axios.delete(`/api/students/${studentId}`)
  		.then(res => {
  			const remainingStudents = this.state.students.filter(student => student.id !== +studentId)
  			this.setState({ students: remainingStudents })
  		})
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
  	this.addStudent(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa, this.state.campusId)
  	this.setState({ firstName: '', lastName: '', email: '', gpa: 3.3, campusId: 1 })
  }

	render() {
		const students = this.state.students
		const campuses = this.state.campuses

		return (
			<div>
				<p>
					<Link to='/campuses'>CAMPUSES</Link>
				</p>
				<p>
					<Link to='/students'>STUDENTS</Link>
				</p>

				<h1>Students:</h1>
				<table>
					<thead>
						<tr>
							<th>NAME</th>
							<th>CAMPUS</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody>
					{
						students.map(student => {
							return (
								<tr key={student.id}>
									<td><Link to={`/students/${student.id}`}>{student.name}</Link></td>
									<td><Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></td>
									<td><button type="button" className="delete" onClick={this.handleDelete} value={student.id}>X</button></td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
					<legend>New Student</legend>
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
						<button type="submit">Create A New Student</button>
					</div>
					</fieldset>
				</form>
			</div>
		)
	}
}