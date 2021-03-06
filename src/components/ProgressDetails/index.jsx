import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Collapsible,
  Hyperlink,
  Modal,
} from '@edx/paragon';

export default class ProgressDetails extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.resetModalWrapperState = this.resetModalWrapperState.bind(this);

    this.state = {
      modalOpen: false,
      modalModel: [{}],
    };

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'MMMM D, YYYY';

    // Set the timezone for every instance.
    // Moment.globalTimezone = 'America/Los_Angeles';

    // Set the output timezone for local for every instance.
    Moment.globalLocal = true;

    // Use a <span> tag for every react-moment instance.
    Moment.globalElement = 'span';
  }

  getBadgrLogo() {
    const appBaseUrl = process.env.BASE_URL;
    const logoPath = `${window.location.protocol}//${appBaseUrl}/src/images/badgr-logo.svg`;
    return (
      <img src={logoPath} alt="Badgr Logo" align="right" />
    );
  }

  openModal() {
    this.setState({
      modalOpen: true,
      modalModel: [{}],
    });
  }

  resetModalWrapperState() {
    this.setState({
      modalOpen: false,
      modalModel: [{}],
    });
    // this.button.focus();
  }

  redirectBackpack() {
    window.open('https://badgr.io/recipient/badges', '_blank');
  }

  render() {
    const {
      progress, minimal,
    } = this.props;

    const childElements = (
      <img className={classNames('card-img-top asserted', minimal)} src={progress.assertion.image_url} alt={progress.badge_class.display_name} />
    );

    return (
      <React.Fragment>
        <div>
          <div className="modal-progress-details" />
          <Button buttonType="link" className="m-0 p-0" onClick={this.openModal} >
            {childElements}
          </Button>
        </div>
        <Modal
          open={this.state.modalOpen}
          closeText="Close"
          title=""
          body={(
            <React.Fragment>
              <div className="progress-details">
                <div className="progress-details-header mb-5">
                  <div className="progress-details-title row w-100">
                    <h2 className="col">{progress.badge_class.display_name}</h2>
                  </div>
                  <div className="progress-details-description row w-100">
                    <div className="col">
                      {progress.badge_class.description}
                    </div>
                  </div>
                </div>
                <div className="progress-details-body row w-100">
                  <div className="progress-details-image col col-3">
                    <img src={progress.assertion.image_url} alt={progress.badge_class.display_name} />
                    <Button
                      label="View Backpack"
                      buttonType="primary"
                      className=""
                      onClick={this.redirectBackpack}
                    />
                  </div>
                  <div className="progress-details-meta col col-9">
                    {progress.assertion.issuedOn && (
                      <div className="progress-details-meta-earned">
                        <h3>Earned</h3>
                        <p><Moment>{progress.assertion.issuedOn}</Moment></p>
                      </div>
                    )}
                    {progress.assertion.recipient.plaintextIdentity && (
                      <div className="progress-details-meta-recipient">
                        <h3>Recipient</h3>
                        <p>{progress.assertion.recipient.plaintextIdentity}</p>
                      </div>
                    )}
                    {progress.badge_class.criteria && (
                      <div className="progress-details-meta-criteria">
                        <h3>Criteria</h3>
                        <ReactMarkdown source={progress.badge_class.criteria} />
                      </div>
                    )}
                    {progress.assertion.issuer && (
                      <div className="progress-details-meta-issuer">
                        <h3>Issuer</h3>
                        <ul className="pl-0">
                          <li>
                            <span className="mr-2"><Hyperlink destination={progress.assertion.issuer.openBadgeId} content={progress.assertion.issuer.name} target="_blank" /></span>
                            <span>{progress.assertion.issuer.email}</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="progress-details-share">
                  <Collapsible title="Badgr Share Details">
                    <div className="progress-details-share-instructions row w-100 p-4">
                      <div className="share-introduction col col-12 pb-4">
                        <h3>Share your Open Badge with Badgr</h3>
                        <p>
                          Your achievement has been recognized with an <Hyperlink destination="https://openbadges.org/" content="Open Badge" target="_blank" />, a digital image file with information
                          embedded in it that uniquely identifies your accomplishments.
                        </p>
                        <p className="mb-4">
                          Badgr is a service that creates and stores Open Badges and lets you share them with others.
                          To share your badge using Badgr, you can send a link to a web page about your badge to others.
                          You can also send the badge image file directly to others, and they can use a <Hyperlink destination="https://badgecheck.io/" content="badge verification service" target="_blank" /> from Badgr to confirm your accomplishment.
                          For more options, you must first have a Badgr account. You should have received an email the first time you received a badge with
                          instructions about creating a Badgr account. Once you have a Badgr account, you can organize
                          your badges in a Backpack and access tools to help share your badges on social media, embed
                          them in web pages, and more.
                        </p>
                        <hr />
                      </div>
                    </div>
                    <div className="progress-details-share-badgr-instructions row w-100 p-4">
                      <div className="badgr-instructions col col-9">
                        <ol>
                          <li>Create a <Hyperlink destination="https://badgr.io/signup" content="Badgr" target="_blank" /> account, or <Hyperlink destination="https://badgr.io/auth/login" content="log in" target="_blank" /> to your existing account;</li>
                          <li><Hyperlink destination={progress.assertion.assertion_url} content="Share this public URL to your badge" target="_blank" />; or</li>
                          <li>
                            <Hyperlink destination={progress.assertion.image_url} content="Download your badge (right-click or option-click, save as)" target="_blank" /> and share it
                            directly with others. They can verify it&apos;s really yours at <Hyperlink destination="https://badgecheck.io/" content="badgecheck.io" target="_blank" />.
                          </li>
                        </ol>
                      </div>
                      <div className="badgr-image col col-3">
                        {this.getBadgrLogo()}
                      </div>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </React.Fragment>
          )}
          parentSelector={this.props.parentSelector}
          buttons={[]}
          onClose={this.resetModalWrapperState}
        />
      </React.Fragment>
    );
  }
}

ProgressDetails.propTypes = {
  parentSelector: PropTypes.string,
  progress: PropTypes.shape({}).isRequired,
  minimal: PropTypes.string,
};

ProgressDetails.defaultProps = {
  parentSelector: 'body',
  minimal: '',
};

