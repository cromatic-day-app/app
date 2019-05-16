import React from 'react';
import ArtService from '../art-service';
import AuthService from "../auth/auth-service";
import ModalVoucher from "../Partials/ModalVoucher";

class Voucher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchers: [],
      title: "",
      receiver: "",
      creator: "",
      message: "",
      userPhoto: "",
      error: "",
      created: false
    }
    this.ArtService = new ArtService();
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, receiver, creator, message, userPhoto } = this.state

    this.ArtService.newVoucher(title, receiver, creator, message, userPhoto)
      .then((data) => {
        // console.log(newVoucher)
        this.setState({
          vouchers: data.vouchers[data.vouchers.length - 1],
          title: "",
          receiver: "",
          creator: "",
          message: "",
          userPhoto: "",
          error: "",
          created: true
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    const uploadData = new FormData();

    uploadData.append("userPhoto", e.target.files[0]);
    this.service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ userPhoto: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {
          (!this.state.created)
            ? <div>
              <h1>Create your own experience!</h1>
              <form className="movie-form" onSubmit={this.handleFormSubmit}>
                <label>Title:</label>
                <input
                  className="input-form"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)} />
                <label>To:</label>
                <input
                  className="input-form"
                  name="receiver"
                  type="text"
                  value={this.state.receiver}
                  min="0"
                  onChange={e => this.handleChange(e)} />
                <label>From:</label>
                <input
                  className="input-form"
                  name="creator"
                  type="text"
                  value={this.state.creator}
                  onChange={e => this.handleChange(e)} />
                <label>Message:</label>
                <input
                  className="input-form"
                  name="message"
                  type="text"
                  value={this.state.message}
                  onChange={e => this.handleChange(e)} />
                <input
                  type="file"
                  onChange={(e) => this.handleFileUpload(e)} />
                <button type="submit">CREATE</button>
              </form>
            </div>
            : <div>
              {
                <ModalVoucher voucher={this.state.vouchers}/>
              }
            </div>

        }
      </React.Fragment>
    )
  }
}

export default Voucher;



