import './index.css'

const ProjectDetials = props => {
  const {eachDetials} = props
  const {name, imageUrl} = eachDetials
  return (
    <li className="projects-item">
      <img src={imageUrl} className="img" alt={name} />
      <p className="text">{name}</p>
    </li>
  )
}
export default ProjectDetials
