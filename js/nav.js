document.addEventListener('DOMContentLoaded', function () {
  // Menú lateral (3 rayitas)
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
});
