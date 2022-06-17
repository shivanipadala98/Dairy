import { useEffect } from "react";

const Image = (props) => {
  useEffect(() => {
    console.log(props);
    async function getImage() {
      await fetch(`dairy/view/${props.path}`, {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          return res.blob();
        })
        .then((res) => {
          let givenImage = document.querySelector("img");
          let objectURL = URL.createObjectURL(res);
          givenImage.src = objectURL;
        });
    }
    getImage();
  }, []);
  return (
    <div>
      <img
        alt="an external image"
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
};
export default Image;
