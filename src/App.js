import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/predict/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze image. Is the server running?");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigation} activeSection={activeSection} />
      <main className="main-content">
        {activeSection === "home" && (
          <>
            <div className="detector-container">
              <h1>Deepfake Image Detector</h1>
              {!result && (
                <div className="upload-section">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      {preview ? (
                        <img src={preview} alt="Preview" />
                      ) : (
                        "Click to select an image"
                      )}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {selectedFile && (
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Analyze Image"}
                      </button>
                    )}
                  </form>
                  {error && <p className="error-message">{error}</p>}
                </div>
              )}
              {isLoading && <div className="loader"></div>}
              {result && (
                <div className="result-section">
                  <h2>Analysis Result</h2>
                  <div
                    className={
                      result.is_fake ? "result-card fake" : "result-card real"
                    }
                  >
                    <p className="result-label">
                      {result.is_fake ? "Deepfake Detected" : "Authentic Image"}
                    </p>
                    <p className="confidence-score">
                      Confidence: {Math.round(result.confidence * 100)}%
                    </p>
                  </div>
                  <button onClick={handleReset}>Analyze Another Image</button>
                </div>
              )}
            </div>
            <section className="info-section">
              <h2>How It Works</h2>
              <p>
                This tool leverages a sophisticated deep learning model
                (EfficientNet-B4) trained on a vast dataset of real and
                synthetically generated images. When you upload an image, it's
                processed and analyzed for subtle artifacts and inconsistencies
                that are often invisible to the human eye but are tell-tale
                signs of digital manipulation. Our API provides a confidence
                score, giving you a clear indication of the likelihood of an
                image being a deepfake.
              </p>
            </section>
          </>
        )}

        {activeSection === "about" && (
          <section className="info-section full-section">
            <h1>About Deepfake Detector</h1>
            <div className="about-content">
              <p>
                The Deepfake Detector is an advanced AI-powered tool designed to
                identify synthetic or manipulated images with high accuracy. In
                an era of sophisticated digital manipulation, this tool serves
                as a critical resource for detecting deepfakes and ensuring the
                authenticity of visual content.
              </p>
              <h3>Why It Matters</h3>
              <p>
                Deepfakes pose significant challenges to media authenticity,
                security, and trust. Our detector helps individuals,
                organizations, and platforms identify compromised images before
                they spread misinformation.
              </p>
            </div>
          </section>
        )}

        {activeSection === "technology" && (
          <section className="info-section full-section">
            <h1>Technology Stack</h1>
            <div className="tech-info">
              <p>
                <strong>Dataset Note:</strong> The EfficientNet-B4 model was
                trained on a curated Kaggle dataset containing authentic and
                synthetic images. While the dataset is limited in scope, it
                provides a solid foundation for deepfake detection. For
                production use, the model would benefit from training on larger,
                more diverse datasets.
              </p>
            </div>
            <div className="tech-stack">
              <div className="tech-category">
                <h3>🤖 AI & Machine Learning</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <h4>EfficientNet-B4</h4>
                    <p>
                      State-of-the-art convolutional neural network architecture
                      optimized for both accuracy and computational efficiency.
                      This model has been fine-tuned on a comprehensive dataset
                      of authentic and synthetic images.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>PyTorch</h4>
                    <p>
                      Deep learning framework used for model training,
                      inference, and optimization. Provides excellent
                      performance for GPU acceleration and production
                      deployment.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>CUDA & cuDNN</h4>
                    <p>
                      NVIDIA's GPU computing platform and deep neural network
                      library for accelerated inference and model training.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>🔌 Backend & API</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <h4>FastAPI</h4>
                    <p>
                      Modern, fast Python web framework for building
                      high-performance APIs. Provides automatic API
                      documentation and seamless integration with machine
                      learning models.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>Python</h4>
                    <p>
                      Core language for backend development, data processing,
                      and machine learning implementation. Known for its
                      simplicity and powerful libraries.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>Uvicorn</h4>
                    <p>
                      ASGI web server for running FastAPI applications with
                      support for async operations and concurrent request
                      handling.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>REST API</h4>
                    <p>
                      Standard RESTful architecture for image prediction
                      endpoints with JSON request/response formats.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>🎨 Frontend & UI</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <h4>React 19.2.0</h4>
                    <p>
                      Modern JavaScript library for building interactive user
                      interfaces with component-based architecture and state
                      management.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>React Hooks</h4>
                    <p>
                      Functional components with useState, useEffect for state
                      management and side effects handling.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>CSS3 & Glassmorphism</h4>
                    <p>
                      Modern CSS with backdrop filters, gradients, and
                      animations for a polished, contemporary UI design.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>JavaScript ES6+</h4>
                    <p>
                      Modern JavaScript with async/await, destructuring, and
                      other contemporary language features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>📦 Build & Deployment</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <h4>Create React App</h4>
                    <p>
                      Build toolchain that abstracts webpack configuration,
                      providing a streamlined development experience.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>npm</h4>
                    <p>
                      Node Package Manager for dependency management and project
                      scripting.
                    </p>
                  </div>
                  <div className="tech-item">
                    <h4>ESLint & Testing Library</h4>
                    <p>
                      Code quality tools for linting and automated testing of
                      React components.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
