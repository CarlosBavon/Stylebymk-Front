import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Privacy.css";

const Privacy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | StylesbyMK</title>
                <meta name="description" content="Privacy Policy for StylesbyMK hairstyling services. Learn how we collect, use, and protect your personal data." />
            </Helmet>
            <div className="privacy-container">
                <div className="privacy-content">
                    <span className="privacy-emblem" aria-hidden="true"></span>

                    <Link to="/" className="privacy-back-link">&larr; Back to Home</Link>

                    <h1>Privacy Policy</h1>
                    <p className="effective-date">Effective Date: 4th June 2026</p>

                    <nav className="privacy-toc" aria-label="Table of contents">
                        <h2 className="privacy-toc-title">Contents</h2>
                        <ol className="privacy-toc-list">
                            <li><a href="#information-we-collect">Information We Collect</a></li>
                            <li><a href="#how-we-use-your-data">How We Use Your Data</a></li>
                            <li><a href="#disclosure-of-google-user-data">Disclosure of Google User Data</a></li>
                            <li><a href="#storage-security">Storage &amp; Security</a></li>
                            <li><a href="#legal-basis-gdpr">Legal Basis for Processing (GDPR)</a></li>
                            <li><a href="#international-data-transfers">International Data Transfers</a></li>
                            <li><a href="#links-to-other-sites">Links to Other Sites</a></li>
                            <li><a href="#your-rights">Your Rights</a></li>
                            <li><a href="#data-retention">Data Retention</a></li>
                            <li><a href="#childrens-privacy">Children&rsquo;s Privacy</a></li>
                            <li><a href="#changes-to-this-policy">Changes to This Privacy Policy</a></li>
                            <li><a href="#contact-us">Contact Us</a></li>
                        </ol>
                    </nav>

                    <h2 id="information-we-collect">1. Information We Collect</h2>
                    <p><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This includes:</p>
                    <ul>
                        <li>Your Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Details about your requested Hairstyling Service</li>
                    </ul>
                    <p>This data is primarily collected when you fill out our <strong>Booking</strong> or <strong>Enquiry</strong> forms.</p>
                    <p><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include your computer's Internet Protocol address (IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</p>

                    <h2 id="how-we-use-your-data">2. How We Use Your Data</h2>
                    <p>StylesbyMK uses the collected data for various purposes:</p>
                    <ul>
                        <li>To provide and maintain our Service (e.g., to confirm your booking).</li>
                        <li>To notify you about changes to our Service or your appointment.</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                        <li>To provide customer support.</li>
                        <li>To gather analysis or valuable information so that we can improve our Service.</li>
                        <li>To send you marketing and promotional communications (only if you have opted in).</li>
                    </ul>

                    <h2 id="disclosure-of-google-user-data">Disclosure of Google User Data</h2>
                    <p>Our booking system integrates with Google Calendar to manage appointments. When you make a booking through our website, we access and use your basic profile information (name and email address) and the appointment details you provide to perform the following actions on your behalf:</p>
                    <ul>
                        <li><strong>Create Calendar Events:</strong> We automatically create an event on our salon's Google Calendar with your name, selected service, appointment date, and time.</li>
                        <li><strong>Send Calendar Invitations:</strong> We may send you a calendar invitation via Google Calendar to help you remember your appointment.</li>
                    </ul>
                    <p><strong>With Whom We Share Your Google User Data:</strong></p>
                    <ul>
                        <li><strong>Our Salon Team:</strong> Your booking details are visible to our salon staff who manage the calendar and prepare for your appointment.</li>
                        <li><strong>Technical Service Providers:</strong> We use <strong>MongoDB Atlas</strong> to store your booking data and <strong>Render</strong> to host our backend server. These providers may process your data on our behalf, but they are not permitted to use it for their own purposes.</li>
                        <li><strong>Legal and Compliance:</strong> We may disclose your information if required by law or to protect the rights, property, or safety of our business, our clients, or others.</li>
                    </ul>
                    <p><strong>Limited Use Compliance:</strong></p>
                    <p>Our use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the <strong>Limited Use</strong> requirements. We do not sell your Google user data or use it for advertising or marketing purposes beyond the scope of booking management.</p>

                    <h2 id="storage-security">3. Storage &amp; Security</h2>
                    <p>We take the security of your data seriously. Your personal data (name, email, phone) is stored securely on our database hosted by <strong>MongoDB Atlas</strong>. While we strive to use commercially acceptable means to protect your Personal Data, remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. We also use <strong>Google Calendar</strong> solely for the purpose of scheduling your appointments and sending you calendar invites.</p>

                    <h2 id="legal-basis-gdpr">4. Legal Basis for Processing (GDPR)</h2>
                    <p>If you are from the European Economic Area (EEA), StylesbyMK's legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it. We may process your Personal Data because:</p>
                    <ul>
                        <li>We need to perform a contract with you (i.e., to schedule your hairstyling appointment).</li>
                        <li>You have given us permission to do so.</li>
                        <li>The processing is in our legitimate interests and it is not overridden by your rights.</li>
                    </ul>

                    <h2 id="international-data-transfers">5. International Data Transfers</h2>
                    <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>

                    <h2 id="links-to-other-sites">6. Links to Other Sites</h2>
                    <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

                    <h2 id="your-rights">7. Your Rights</h2>
                    <p>You have the right to access, update, or delete the information we have on you. You have the right to withdraw your consent at any time (which will result in the cancellation of your booking). If you wish to exercise any of these rights, please contact us at <strong>davidmuigai241@gmail.com</strong>.</p>

                    <h2 id="data-retention">8. Data Retention</h2>
                    <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>

                    <h2 id="childrens-privacy">9. Children's Privacy</h2>
                    <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

                    <h2 id="changes-to-this-policy">10. Changes to This Privacy Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h2 id="contact-us">11. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul>
                        <li>By email: <strong>davidmuigai241@gmail.com</strong></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Privacy;
