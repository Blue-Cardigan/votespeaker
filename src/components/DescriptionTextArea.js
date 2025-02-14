const DescriptionTextArea = ({ description, setDescription }) => {

  return (
    <div className="description-text-area">
      <textarea
        id="description"
        name="description"
        className="text-area"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        placeholder="Type or paste relevant policy here"
      ></textarea>
    </div>
  );
};

export default DescriptionTextArea;
