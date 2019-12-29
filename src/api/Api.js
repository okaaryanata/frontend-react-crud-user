import $ from "jquery";

const crudUserUrl = "http://localhost:5000";

//  API circledu

function getAllUser() {
  var data = {};
  $.ajax({
    method: "GET",
    url: crudUserUrl + "/api/account/users",
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    success: function(res) {
      data = res;
    },
    error: function(err) {
      alert(`Error : ${JSON.stringify(err)}`);
      // alert("error: " + this.status);
      console.log(err);
    }
  });
  return data;
}

function login(request) {
  $.ajax({
    method: "POST",
    url: crudUserUrl + "/api/account/login",
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
    },
    data: JSON.stringify({
      email: request.email,
      password: request.password
    }),
    success: function(res) {
      document.cookie = `token=${res.data.token}`;
      window.location = "/";
    },
    error: function(err) {
      console.log(err);
      alert("email atau password salah ");
      // alert(err.detail)
    }
  });
}

function register(request) {
  $.ajax({
    method: "POST",
    url: crudUserUrl + "/api/account/register",
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
    },
    data: JSON.stringify(request),
    success: function(res) {
      alert("Registrasi berhasil, silahkan Login");
    },
    error: function(err) {
      alert("error: " + JSON.stringify(err));
      console.log(err);
    }
  });
}

function createUser(request) {
  $.ajax({
    method: "POST",
    url: crudUserUrl + "/api/account/users",
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    data: JSON.stringify(request),
    success: function(res) {
      alert(`Sukses menambah user`);
      window.location.reload();
    },
    error: function(err) {
      alert(`Error : ${JSON.stringify(err.responseJSON.message)}`);
      console.log(err);
    }
  });
}

function checkCookie() {
  if (
    getCookie("token") === null ||
    getCookie("token") === undefined ||
    getCookie("token") === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function getListRole() {
  var result = [];
  $.ajax({
    method: "GET",
    url: crudUserUrl + "/api/role",
    async: false,
    success: function(res) {
      result = res;
    },
    error: function(err) {
      alert(`Error : ${JSON.stringify(err)}`);
      console.log(err);
    }
  });
  return result;
}

function getUserById(request) {
  var data = {};
  $.ajax({
    method: "GET",
    url: crudUserUrl + "/api/account/user/" + request,
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    success: function(res) {
      data = res;
    },
    error: function(err) {
      console.log(err);
    }
  });
  return data;
}

function deleteUser(request) {
  $.ajax({
    method: "DELETE",
    url: crudUserUrl + "/api/account/users/" + request,
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    success: function(res) {
      alert(res.message);
      window.location.reload();
    },
    error: function(err) {
      alert(`Error : ${JSON.stringify(err.responseJSON.message)}`);
      console.log(err);
    }
  });
}

function updateUser(request) {
  $.ajax({
    method: "PUT",
    url: crudUserUrl + "/api/account/users/" + request.id,
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    data: JSON.stringify(request),
    success: function(res) {
      alert(`Sukses mengubah user`);
      window.location.reload();
    },
    error: function(err) {
      alert(`Error : ${JSON.stringify(err.responseJSON.message)}`);
      console.log(err);
    }
  });
}

function auth() {
  var data = {};
  $.ajax({
    method: "GET",
    url: crudUserUrl + "/api/account/auth",
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Authorization", "Bearer " + getCookie("token"));
    },
    success: function(res) {
      data = res;
    },
    error: function(err) {
      // alert(`Error : ${JSON.stringify(err)}`);
      // alert("error: " + this.status);
      window.location = "/login";
      console.log(err);
    }
  });
  return data;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function removeCookie() {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location = "/login";
  window.location.reload();
}
export {
  checkCookie,
  getCookie,
  login,
  removeCookie,
  register,
  getListRole,
  getAllUser,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  auth
};
