class Cweep extends RestModel {

  constructor(props) {
    super(props);

    this.root = '/cweeps';
  }

  serialize() {
    return {
      message:  this.message,
      avatar:   this.avatar
    };
  }

}
