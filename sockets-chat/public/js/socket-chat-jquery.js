var params = new URLSearchParams(window.location.search);

// Jquery References
var divUsers = $("#divUsuarios");

// render users
function renderUsers(users) {
  // [{},{},{}]
  console.log(users);

  var html = "";

  html += "<li>";
  html +=
    '     <a href="javascript:void(0)" class="active"> Chat de <span> ' +
    params.get("room") +
    "</span></a>";
  html += "</li>";

  for (var i = 0; i < users.length; i++) {
    html += "<li>";
    html +=
      '<a data-id="' +
      users[i].id +
      '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"/><span> ' +
      users[i].name +
      ' <small class="text-success">online</small></span></a>';
    html += "</li>";
  }

  divUsers.html(html);
}

// Listeners
divUsers.on("click", "a", function () {
  var id = $(this).data("id");
  if (id) {
    console.log(id);
  }
});
