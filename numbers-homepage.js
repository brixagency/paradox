<script>
    function createDigitColumn() {
        const column = document.createElement('div');
        column.className = 'digit-column';
        for (let i = 0; i <= 9; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            column.appendChild(span);
        }
        return column;
    }

    function setupNumber(id, finalNumber, prefix = '', suffix = '') {
        const container = document.getElementById(id);
        if (prefix) {
            const prefixElem = document.createElement('div');
            prefixElem.className = 'prefix';
            prefixElem.textContent = prefix;
            container.appendChild(prefixElem);
        }
        const digits = finalNumber.toString().replace(/,/g, '');
        for (let i = 0; i < digits.length; i++) {
            if (digits[i] === ',') {
                const comma = document.createElement('div');
                comma.className = 'comma';
                comma.textContent = ',';
                container.appendChild(comma);
            } else {
                const digit = document.createElement('div');
                digit.className = 'digit';
                digit.appendChild(createDigitColumn());
                container.appendChild(digit);
            }
        }
        if (suffix) {
            const suffixElem = document.createElement('div');
            suffixElem.className = 'suffix';
            suffixElem.textContent = suffix;
            container.appendChild(suffixElem);
        }
    }

    function animateNumber(id, finalNumber) {
        const container = document.getElementById(id);
        const digits = finalNumber.toString().replace(/,/g, '');
        const columns = container.querySelectorAll('.digit-column');
        
        columns.forEach((column, index) => {
            const targetDigit = parseInt(digits[index]);
            gsap.to(column, {
                top: -targetDigit * 72,
                duration: 2,
                ease: "power1.inOut",
                delay: index * 0.1
            });
        });
    }

    // Setup numbers
    setupNumber('hours', '40,000');
    setupNumber('percentage', '54', '', '%');
    setupNumber('savings', '2', '$', 'MM');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                switch(id) {
                    case 'hours':
                        animateNumber(id, '40,000');
                        break;
                    case 'percentage':
                        animateNumber(id, '54');
                        break;
                    case 'savings':
                        animateNumber(id, '2');
                        break;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the elements
    ['hours', 'percentage', 'savings'].forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
    });
</script>
