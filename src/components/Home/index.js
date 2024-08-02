import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProjectDetials from '../ProjectDetials'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const constApiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {
    selectOption: categoriesList[0].id,
    dataList: [],
    apiStatus: constApiStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: constApiStatus.loading})
    const {selectOption} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${selectOption}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({dataList: updatedData, apiStatus: constApiStatus.success})
    } else {
      this.setState({apiStatus: constApiStatus.failed})
    }
  }

  onChangeSelect = event => {
    this.setState({selectOption: event.target.value}, this.getData)
  }

  renderloadingView = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {dataList} = this.state

    return (
      <div className="data-container">
        <ul className="projects-container">
          {dataList.map(each => (
            <ProjectDetials eachDetials={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailedView = () => (
    <div className="failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="header">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case constApiStatus.loading:
        return this.renderloadingView()
      case constApiStatus.success:
        return this.renderSuccessView()
      case constApiStatus.failed:
        return this.renderFailedView()
      default:
        return null
    }
  }

  render() {
    const {selectOption} = this.state
    return (
      <>
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
        <div className="projects-container-items">
          <ul className="projects-list">
            <select
              className="select"
              value={selectOption}
              onChange={this.onChangeSelect}
            >
              {categoriesList.map(each => (
                <option key={each.id} value={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.renderResults()}
        </div>
      </>
    )
  }
}
export default Home
