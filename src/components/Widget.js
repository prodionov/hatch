import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import './rangeslider.css';
import thumbUp from './assets/thumbs-up.svg';
import thumbDown from './assets/thumb-down.svg';

function Stats(props) {
  return (
    <div className="row  row__widget">
      <div className="col-2-of-4">
        <h4 className="heading-quaternary">{props.name}</h4>
        <span className="box box__medium">
          £{props.data.amount.toLocaleString()}
        </span>
      </div>
      <div className="col-1-of-4">
        <h4 className="heading-quaternary">From age:</h4>
        <span className="box box__small">{props.data.from_age}</span>
      </div>
      <div className="col-1-of-4">
        <h4 className="heading-quaternary">To age:</h4>
        <span className="box box__small">{props.data.to_age}</span>
      </div>
    </div>
  );
}

class RangeSliders extends Component {
  state = {
    value: 0
  };

  handleChange = value => {
    this.setState({ value: value });
    localStorage.setItem(this.props.name, value);
  };
  render() {
    let data = Number(localStorage.getItem(this.props.name));
    return (
      <div className="row row__slider">
        <div className="col-2-of-7">
          <h4 className="heading-quaternary">{this.props.name}</h4>
        </div>
        <div className="col-5-of-7">
          <div className="slider">
            <Slider
              min={0}
              max={this.props.max}
              value={data}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default class Widget extends Component {
  state = {
    isLiked: '',
    isDisplayed: true
  };

  thumbUpHandler = event => {
    event.preventDefault();
    alert('we are happy that you like our service');
    this.setState({ isLiked: true });
  };

  thumbDownHandler = event => {
    event.preventDefault();
    alert('please let us know how we can improve');
    this.setState({ isLiked: false });
  };

  displayLink = event => {
    event.preventDefault();
    this.setState({ isDisplayed: false });
  };

  render() {
    const data = {
      incomes: [
        {
          amount: 45300,
          from_age: 30,
          to_age: 67,
          frequency: 'annual',
          name: 'Annual salary'
        }
      ],
      expenditures: [
        {
          amount: 1199,
          from_age: 30,
          to_age: 65,
          frequency: 'monthly',
          name: 'Mortgage'
        },
        {
          amount: 1199,
          from_age: 30,
          to_age: 65,
          frequency: 'monthly',
          name: 'Bills'
        },
        {
          amount: 1199,
          from_age: 30,
          to_age: 65,
          frequency: 'monthly',
          name: 'General spending'
        }
      ]
    };
    console.log('isDisplayed', this.state.isDisplayed);
    return (
      <div className="row">
        <div className="col-1-of-2">
          <div className="widget">
            <h2 className="heading-secondary">your income & spend</h2>
            <div className="widget__content">
              <h3 className="heading-tertiary">Annual income</h3>
              <Stats name={'Annual salary'} data={data.incomes[0]} />
              <h3 className="heading-tertiary">Monthly spending</h3>
              <Stats name={'Mortgage'} data={data.expenditures[0]} />
              <Stats name={'Bill'} data={data.expenditures[1]} />
              <Stats name={'General spending'} data={data.expenditures[2]} />
            </div>
          </div>
        </div>
        <div className="col-1-of-2">
          <div className="widget">
            <h2 className="heading-secondary">spend less</h2>
            <div className="widget__content">
              <h4 className="heading-quaternary u-text-center">
                Try reducing your monthly spending to see
                <br />
                <span>how your forecast could improve!</span>
              </h4>
              <RangeSliders name={'Mortgage'} max={1000} />
              <RangeSliders name={'Bills'} max={200} />
              <RangeSliders name={'General spending'} max={3000} />
              <h4 className="heading-quaternary u-text-center">
                This means you're saving
                <span className="u-color-green"> £230</span> per month
              </h4>
              <a
                href="https://about.hatchplan.co.uk/"
                target="_blank"
                className="btn u-margin-bottom-small"
              >
                Find ways to save
              </a>
              {this.state.isDisplayed && (
                <div className="row">
                  <a
                    href=""
                    className="btn-text u-margin-bottom-small"
                    onClick={this.displayLink}
                  >
                    Was this helpful?
                  </a>
                  <div className="logo-box">
                    <a href="" className="thumb" onClick={this.thumbUpHandler}>
                      <img src={thumbUp} alt="thumb-up" className="logo" />
                    </a>
                    <a
                      href=""
                      className="thumb"
                      onClick={this.thumbDownHandler}
                    >
                      <img src={thumbDown} alt="thumb-down" className="logo" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
