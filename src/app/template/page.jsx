import React from "react";

export default function page() {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Right Resume</title>
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="crossorigin"
            />
            <link
                rel="preload"
                as="style"
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Roboto:wght@300;400;500;700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Roboto:wght@300;400;500;700&display=swap"
                media="print"
                onload="this.media='all'"
            />
            <link href="https://desired-techs.com/job-bank/resume/templates/developer/css/font-awesome/css/all.min.css" rel="stylesheet" />
            <link href="https://desired-techs.com/job-bank/resume/templates/developer/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://desired-techs.com/job-bank/resume/templates/developer/css/aos.css" rel="stylesheet" />
            <link href="https://desired-techs.com/job-bank/resume/templates/developer/css/main.css" rel="stylesheet" />
            <noscript>
                &lt;style type="text/css"&gt; [data-aos] {"{"}
                opacity: 1 !important; transform: translate(0) scale(1) !important;
                {"}"}
                &lt;/style&gt;
            </noscript>
            <div className="page-content">
                <div className="container">
                    <div className="cover shadow-lg bg-white">
                        <div className="cover-bg p-3 p-lg-4 text-white">
                            <div className="row">
                                <div className="col-lg-4 col-md-5">
                                    <div className="avatar hover-effect bg-white shadow-sm p-1">
                                        <img src="images/avatar.jpg" width={200} height={200} />
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-7 text-center text-md-start">
                                    <h2
                                        className="h1 mt-2"
                                        data-aos="fade-left"
                                        data-aos-delay={0}
                                    >
                                        Joyce Harrison
                                    </h2>
                                    <p data-aos="fade-left" data-aos-delay={100}>
                                        Graphic Designer &amp; Web Developer
                                    </p>
                                    <div
                                        className="d-print-none"
                                        data-aos="fade-left"
                                        data-aos-delay={200}
                                    >
                                        <a
                                            className="btn btn-light text-dark shadow-sm mt-1 me-1"
                                            href="right-resume.pdf"
                                            target="_blank"
                                        >
                                            Download CV
                                        </a>
                                        <a
                                            className="btn btn-success shadow-sm mt-1"
                                            href="#contact"
                                        >
                                            Hire Me
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-section pt-4 px-3 px-lg-4 mt-1">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="h3 mb-3">About Me</h2>
                                    <p>
                                        Hello! I’m Joyce Harrison. I am passionate about UI/UX
                                        design and Web Design. I am a skilled Front-end Developer
                                        and master of Graphic Design tools such as Photoshop and
                                        Sketch.
                                    </p>
                                </div>
                                <div className="col-md-5 offset-md-1">
                                    <div className="row mt-2">
                                        <div className="col-sm-4">
                                            <div className="pb-1">Age</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="pb-1 text-secondary">28</div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="pb-1">Email</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="pb-1 text-secondary">
                                                Joyce@company.com
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="pb-1">Phone</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="pb-1 text-secondary">+0718-111-0011</div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="pb-1">Address</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="pb-1 text-secondary">
                                                140, City Center, New York, U.S.A
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="d-print-none" />
                        <div className="skills-section px-3 px-lg-4">
                            <h2 className="h3 mb-3">Professional Skills</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <span>HTML</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-primary"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={100}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "90%" }}
                                                aria-valuenow={90}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span>CSS</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-primary"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={200}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "85%" }}
                                                aria-valuenow={85}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span>JavaScript</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-primary"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={300}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "75%" }}
                                                aria-valuenow={75}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <span>Adobe Photoshop</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={400}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "80%" }}
                                                aria-valuenow={90}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span>Sketch</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={500}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "85%" }}
                                                aria-valuenow={85}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span>Adobe XD</span>
                                        <div className="progress my-1">
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                data-aos="zoom-in-right"
                                                data-aos-delay={600}
                                                data-aos-anchor=".skills-section"
                                                style={{ width: "75%" }}
                                                aria-valuenow={75}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="d-print-none" />
                        <div className="work-experience-section px-3 px-lg-4">
                            <h2 className="h3 mb-4">Work Experience</h2>
                            <div className="timeline">
                                <div className="timeline-card timeline-card-primary card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Frontend Developer
                                            <span className="text-muted h6">at Creative Agency</span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            May, 2015 - Present
                                        </div>
                                        <div>
                                            Leverage agile frameworks to provide a robust synopsis for
                                            high level overviews. Iterative approaches to corporate
                                            strategy foster collaborative thinking to further the
                                            overall value proposition.
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-card timeline-card-primary card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Graphic Designer
                                            <span className="text-muted h6">at Design Studio</span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            June, 2013 - May, 2015
                                        </div>
                                        <div>
                                            Override the digital divide with additional clickthroughs
                                            from DevOps. Nanotechnology immersion along the
                                            information highway will close the loop on focusing solely
                                            on the bottom line.
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-card timeline-card-primary card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Junior Web Developer
                                            <span className="text-muted h6">at Indie Studio</span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            Jan, 2011 - May, 2013
                                        </div>
                                        <div>
                                            User generated content in real-time will have multiple
                                            touchpoints for offshoring. Organically grow the holistic
                                            world view of disruptive innovation via workplace
                                            diversity and empowerment.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="d-print-none" />
                        <div className="page-break" />
                        <div className="education-section px-3 px-lg-4 pb-4">
                            <h2 className="h3 mb-4">Education</h2>
                            <div className="timeline">
                                <div className="timeline-card timeline-card-success card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Masters in Information Technology
                                            <span className="text-muted h6">
                                                from International University
                                            </span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            2011 - 2013
                                        </div>
                                        <div>
                                            Leverage agile frameworks to provide a robust synopsis for
                                            high level overviews. Iterative approaches to corporate
                                            strategy foster collaborative thinking to further the
                                            overall value proposition.
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-card timeline-card-success card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Bachelor of Computer Science
                                            <span className="text-muted h6">
                                                from Regional College
                                            </span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            2007 - 2011
                                        </div>
                                        <div>
                                            Override the digital divide with additional clickthroughs
                                            from DevOps. Nanotechnology immersion along the
                                            information highway will close the loop on focusing solely
                                            on the bottom line.
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-card timeline-card-success card shadow-sm">
                                    <div className="card-body">
                                        <div className="h5 mb-1">
                                            Science and Mathematics
                                            <span className="text-muted h6">from Mt. High Scool</span>
                                        </div>
                                        <div className="text-muted text-small mb-2">
                                            1995 - 2007
                                        </div>
                                        <div>
                                            User generated content in real-time will have multiple
                                            touchpoints for offshoring. Organically grow the holistic
                                            world view of disruptive innovation via workplace
                                            diversity and empowerment.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
