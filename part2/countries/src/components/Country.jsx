const Country = ({ country, onClick }) => {
  return (
    <>
      <div>
        {country.name.common} <button onClick={onClick}>Show</button>
      </div>
    </>
  )
}

export default Country