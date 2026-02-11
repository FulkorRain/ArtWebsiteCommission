class Calendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.today = new Date();
        this.currentMonth = this.today.getMonth();
        this.currentYear = this.today.getFullYear();
        this.currentDate = this.today.getDate();
        
        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        this.links = {};
    }

    addLink(monthIndex, day, url) {
        const key = `${monthIndex}-${day}`;
        this.links[key] = url;
    }

    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    render() {
        if (!this.container) return;

        const daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
        const startDay = this.getFirstDayOfMonth(this.currentMonth, this.currentYear);

        const table = document.createElement('table');
        table.className = 'calendar-widget';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('td');
        
        headerCell.colSpan = 7;
        headerCell.className = 'month-header box-label'; 
        
        headerCell.innerHTML = `<div class="month-label"><p>${this.monthNames[this.currentMonth]} ${this.currentYear}<p></div>`;
        
        headerRow.appendChild(headerCell);
        thead.appendChild(headerRow);

        const daysRow = document.createElement('tr');
        const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        
        weekDays.forEach((day, index) => {
            const th = document.createElement('td');
            th.className = `week-day week-${index + 1}`;
            th.textContent = day;
            daysRow.appendChild(th);
        });
        thead.appendChild(daysRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let dateCount = 1;
        let row = document.createElement('tr');

        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('td');
            emptyCell.innerHTML = '&nbsp;';
            row.appendChild(emptyCell);
        }

        for (let i = startDay; i < 7; i++) {
            if (dateCount <= daysInMonth) {
                row.appendChild(this.createDayCell(dateCount));
                dateCount++;
            } else {
                break; 
            }
        }
        tbody.appendChild(row);

        while (dateCount <= daysInMonth) {
            row = document.createElement('tr');
            for (let i = 0; i < 7; i++) {
                if (dateCount <= daysInMonth) {
                    row.appendChild(this.createDayCell(dateCount));
                    dateCount++;
                } else {
                    const emptyCell = document.createElement('td');
                    emptyCell.innerHTML = '&nbsp;';
                    row.appendChild(emptyCell);
                }
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        
        this.container.innerHTML = '';
        this.container.appendChild(table);
    }

    createDayCell(day) {
        const cell = document.createElement('td');
        const linkKey = `${this.currentMonth}-${day}`;
        
        let content = day;
        
        if (day === this.currentDate) {
            content = `<span class="current-date"><strong>${day}</strong></span>`;
        }

        if (this.links[linkKey]) {
            const a = document.createElement('a');
            a.href = this.links[linkKey];
            a.innerHTML = content;
            cell.appendChild(a);
        } else {
            cell.innerHTML = content;
        }

        return cell;
    }
}