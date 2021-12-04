import React, { Component } from 'react'

export default class Navigation extends Component {

  state = {
    UserName: '',
    UserLastName: ''
  }

  componentDidMount() {
    this.setState({
      UserName: localStorage.getItem('UserName'),
      UserLastName: localStorage.getItem('UserLastName')
    })
  }

  render() {

    return (
      <div className="position-absolute" style={{ zIndex: '10', right: '1%', bottom: '1%' }}>
        <div className="dropdown dropup">
          <button className="btn btn-success rounded-pill" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle"></i>
          </button>
          <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
            <li><i className="bi bi-apple p-2"></i></li>
            <li><i className="bi bi-door-closed-fill p-2"></i></li>
          </ul>
        </div>
      </div >
    )
  }
}
