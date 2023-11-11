import React, { Component } from "react";
import tutorialService from "../services/tutorial.service";
import { withRouter } from "../common/with-router";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guncellenecekTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.tutorialGuncelle = this.tutorialGuncelle.bind(this);
    this.tutorialSil = this.tutorialSil.bind(this);
  }

  componentDidMount() {
    console.log("bir önceki sayfadana gelen id : " + this.props.router.params.id);
    this.detayTutorial(this.props.router.params.id);
  }

  detayTutorial(id) {
    tutorialService
      .get(id)
      .then((gelenDetayTutorial) => {
        console.log(gelenDetayTutorial);
        this.setState({
          guncellenecekTutorial: gelenDetayTutorial.data,
        });
      })
      .catch((hata) => {
        console.log("detaya gelmedi : " + hata);
      });
  }

  onChangeTitle(e) {
    const title = e.target.value;
    console.log(title);
    this.setState((prevState) => {
      return {
        guncellenecekTutorial: {
          ...prevState.guncellenecekTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    console.log(description);
    this.setState((prevState) => {
      return {
        guncellenecekTutorial: {
          ...prevState.guncellenecekTutorial,
          description: description,
        },
      };
    });
  }

  tutorialGuncelle() {
    tutorialService
      .update(this.props.router.params.id, this.state.guncellenecekTutorial)
      .then((guncellenenTutorial) => {
        console.log(guncellenenTutorial);
      })
      .catch((hata) => {
        console.log("hata olustu : " + hata);
      });
  }

  tutorialSil() {
    tutorialService
      .delete(this.props.router.params.id)
      .then(() => {
        console.log("Tutorial deleted successfully!");
        // Optionally, you can redirect the user to another page or update the state as needed.
      })
      .catch((error) => {
        console.log("Error occurred while deleting tutorial: " + error);
      });
  }

  render() {
    const { guncellenecekTutorial } = this.state;
    return (
      <div className="edit-form">
        <h4>Tutorial Detay</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Başlık</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={guncellenecekTutorial.title}
              onChange={this.onChangeTitle}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Açıklama</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={guncellenecekTutorial.description}
              onChange={this.onChangeDescription}
            />
          </div>
        </form>
        <br />
        <button
          className="btn btn-success"
          onClick={this.tutorialGuncelle}
        >
          Kaydet
        </button>
        &nbsp;
        <button
          className="btn btn-danger"
          onClick={this.tutorialSil}
        >
          Sil
        </button>
      </div>
    );
  }
}

export default withRouter(Tutorial);
