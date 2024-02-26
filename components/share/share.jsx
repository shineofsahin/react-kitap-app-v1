import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { storage } from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { margin } from "@mui/system";
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();
  const [urls1, setUrls1] = useState(null);
  const [kitaptur, setKitaptur] = useState("Roman");
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const fetchUser = () => {
      if (!user) return null;
      setUsername(user.name);
      setPicture(user.picture);
    };
    fetchUser();
  }, [user]);
  const handleChange2 = (text) => (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const uploadCancel = (e) => {
    setProgress(0);
    setImage(null);
    setUrls1(null);
  };
  const handleUpload2 = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImage({ image: url });
            setUrls1(url);
            console.log(url);
          });
      }
    );
  };
  const handleChange = (e) => {
    if (e.target.value === 0) {
      setKitaptur("Roman");
    } else {
      setKitaptur(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      name: username,
      city: user.city,
      desc: desc.current.value,
      img: urls1,
      kitaptur: kitaptur,
    };
    const data = new FormData();
    console.log(newPost);
    try {
      await axios.post("/upload", data);
    } catch (err) {}

    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user?.picture ? user.picture : PF + "noAvatar.png"}
            alt=""
          />
          <input
            placeholder={
              "Merhaba " +
              username +
              ", Elden ele kitap projesine katkıda bulunmak ister misin ?"
            }
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <div className="shareImgContainer">
          <img className="shareImg" src={urls1} alt="" />
          {urls1 === null ? null : (
            <CloseIcon
              onClick={() => uploadCancel()}
              className="shareCancelImg"
            />
          )}
        </div>

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <select
                value={kitaptur}
                onChange={(e) => handleChange(e)}
                className="select-category"
                aria-label="Default select example"
              >
                <option value="Roman"> Roman</option>
                <option selected value="Anlatı">
                  {" "}
                  Anlatı
                </option>
                <option value="Araştırma-İnceleme"> Araştırma-İnceleme</option>
                <option value="Bilim">Bilim </option>
                <option value="Biyografi">Biyografi </option>
                <option value="Çizgi Roman">Çizgi Roman </option>
                <option value="Deneme"> Deneme</option>
                <option value="Edebiyat">Edebiyat </option>
                <option value="Eğitim"> Eğitim</option>
                <option value="Felsefe"> Felsefe</option>
                <option value="Gençlik"> Gençlik</option>
                <option value="Gezi"> Gezi</option>
                <option value="Hikaye">Hikaye </option>
                <option value="Hobi">Hobi </option>
                <option value="İnceleme">İnceleme </option>
                <option value="İş Ekonomi - Hukuk">İş Ekonomi - Hukuk </option>
                <option value="Kişisel Gelişim">Kişisel Gelişim </option>
                <option value="Konuşmalar"> Konuşmalar</option>
                <option value="Masal"> Masal</option>
                <option value="Mektup">Mektup </option>
                <option value="Mizah">Mizah </option>
                <option value="Öykü">Öykü</option>
                <option value="Polisiye"> Polisiye</option>
                <option value="Psikoloji"> Psikoloji</option>
                <option value="Resimli Öykü">Resimli Öykü </option>
                <option value="Anı">Anı </option>
                <option value="Sağlık"> Sağlık</option>
                <option value="Sanat - Tasarım">Sanat - Tasarım </option>
                <option value="Sanat- Müzik"> Sanat- Müzik</option>
                <option value="Sinema Tarihi">Sinema Tarihi </option>
                <option value="Söyleşi">Söyleşi </option>
                <option value="Şiir">Şiir </option>
                <option value="Tarih"> Tarih</option>
                <option value="Yemek Kitapları"> Yemek Kitapları</option>
              </select>
              {urls1 ? (
                <button
                  className="shareButton1"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Görsel yüklendi
                </button>
              ) : (
                <button
                  className="shareButton"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Görsel yükle
                </button>
              )}

              {urls1 === null ? null : (
                <CloseIcon
                  onClick={() => uploadCancel()}
                  style={{ margin: "auto" }}
                />
              )}
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-0 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl text-center font-semibold">
                            Görseli yükle
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              <CloseIcon />
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <input type="file" onChange={handleChange2()} />

                          <progress value={progress} max="100" />
                          {progress === 100 ? setShowModal(false) : null}
                          <img
                            src={urls1}
                            style={{ width: "100%", height: "150px" }}
                          />
                          <p className="my-4 text-blueGray-500 text-lg leading-relaxed"></p>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Kapat
                          </button>
                          <div
                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleUpload2}
                          >
                            Fotoğrafı yükle
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              <button className="shareButton" type="submit">
                Paylaş
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
