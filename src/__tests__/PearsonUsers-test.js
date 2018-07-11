import React from 'react';
import {shallow, mount, render } from 'enzyme';
import { PearsonUsers } from '../PearsonUsers';

const users = [{
    id: 4,
    first_name: "Eve",
    last_name: "Holt",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  },
  {
    id: 5,
    first_name: "Charles",
    last_name: "Morris",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  },
  {
    id: 6,
    first_name: "Tracey",
    last_name: "Ramos",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
  },
  {"id":1,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},
  {"id":2,"first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},
  {"id":3,"first_name":"Emma","last_name":"Wong","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"},
  {"id":4,"first_name":"Eve","last_name":"Holt","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"},
  {"id":5,"first_name":"Charles","last_name":"Morris","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"},
  {"id":6,"first_name":"Tracey","last_name":"Ramos","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"},
  {"id":7,"first_name":"Michael","last_name":"Lawson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},
  {"id":8,"first_name":"Lindsay","last_name":"Ferguson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},
  {"id":9,"first_name":"Tobias","last_name":"Funke","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"},
  {"id":10,"first_name":"Byron","last_name":"Fields","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"}
]

describe("PearsonUsers present", () => {
    let user;
    
    beforeEach(() => {
        user = shallow(<PearsonUsers />);
        const h1 = user.find("h1");
        expect(h1.text()).toEqual("Pearson User Management");
      });
    
    it("add functionality to delete a user from the state", async () => {
        const updatedState = [{"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg", "first_name": "Eve", "id": 4, "last_name": "Holt"}, {"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg", "first_name": "Charles", "id": 5, "last_name": "Morris"}, {"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg", "first_name": "Tracey", "id": 6, "last_name": "Ramos"}];
        user.instance()._deleteUser(4);
        user.instance()._deleteUser(5);
        user.instance()._deleteUser(6); 
        const state = user.state();
        expect(state.users).toEqual(updatedState);
    });

    it("add functionality to remove duplicated users from the state", async () => {
        const result = user.instance()._removeDuplicates();
        const sortedUsers = users.sort(function(prev, next) {return (prev.id > next.id) ? 1 : ((next.id > prev.id) ? -1 : 0);} );
        const filteredResults = sortedUsers.reduce((accumulator, current) => {
            const length = accumulator.length;
            if (length === 0 || accumulator[length - 1].id !== current.id) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        const state = user.state();
        state.users = filteredResults;
        expect(state.users).toEqual(filteredResults);
    });
});