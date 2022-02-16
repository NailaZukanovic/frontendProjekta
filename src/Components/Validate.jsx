    const Auth =  async (e) => {
          e.preventDefault();
          try {
              await axios.post('http://localhost:4000/login', {
                  email: e.value.email,
                  password: e.value.password
              });
              history.push("/notes");
          } catch (error) {
              if (error.response) {
                  setMsg(error.response.data.msg);
              }
          }
        console.log(e.target.value);
      }