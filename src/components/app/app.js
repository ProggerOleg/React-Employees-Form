import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: 'John C.', salary: 500, increase: false, promotion: true, id:1},
                {name: 'Oleh T.', salary: 1200, increase: true, promotion: false, id: 2},
                {name: 'Sergey H.', salary: 800, increase: false, promotion: false, id: 3}
            ],
            term: '', 
            filter: 'all'
        }
        this.maxId = 4;
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary, 
            increase: false,
            promotion: false,
            id: this.maxId++
            }

        this.setState(({data}) => {
            return {
                data: [...data, newItem]
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data})=> (
            {data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })}
        ))
    }

    searchEmp = (items, term, onPromotion, highSalary) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item=> {
            return item.name.indexOf(term) > -1
        })
    }
    
    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onUpdateList = (data, filter) => {
        switch (filter) {
            case 'onPromotion':
                return data.filter(item=> item.promotion );
            case 'highSalary':
                return data.filter(item => item.salary > 1000);
            default:
                return data
        }
    }
    
    onFilterSelect = (filter) => {
        this.setState({filter});
    }



    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length,
              increased = this.state.data.filter(item=>item.increase===true).length;
        const visibleData = this.onUpdateList(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;