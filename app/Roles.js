'use strict'

const ALL_ROLES = ['ADMIN', 'FARMER'];

class Roles {
	static getAll() {
		return ALL_ROLES;
	}

	static isUserHasAcess(route, user) {
		if (!route.accessible.length) return true;
		if (!user) return false;
		return (route.accessible.indexOf(user.role) !== -1);
	}

	static isValidRole(role) {
		return (ALL_ROLES.indexOf(role) !== -1);
	}
}

module.exports = Roles;