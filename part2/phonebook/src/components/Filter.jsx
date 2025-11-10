const Filter = ({ searchName, onChange }) => (
  <>
    <div>
      filter shown with:
      <input value={searchName} onChange={onChange} />
    </div>
  </>
)

export default Filter