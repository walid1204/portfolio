// PDF Preview Modal Functionality
(function () {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function () {

        // Create PDF modal HTML and append to body
        const pdfModalHTML = `
            <div id="pdf-preview-modal" class="pdf-preview-modal">
                <div class="pdf-preview-modal-content">
                    <div class="pdf-modal-header">
                        <h3 id="pdf-modal-title">Case Study Preview</h3>
                        <span class="close-pdf-modal">&times;</span>
                    </div>
                    <div class="pdf-preview-container">
                        <iframe id="pdf-iframe" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="pdf-modal-footer">
                        <a id="pdf-download-link" href="#" target="_blank" class="pdf-download-btn">
                            <i class="las la-download"></i> Open in Google Drive
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body
        $('body').append(pdfModalHTML);

        // Get modal elements
        const pdfModal = $('#pdf-preview-modal');
        const pdfIframe = $('#pdf-iframe');
        const pdfModalTitle = $('#pdf-modal-title');
        const pdfDownloadLink = $('#pdf-download-link');
        const closePdfModal = $('.close-pdf-modal');

        // Click handler for PDF buttons (Resume and Project Descriptions)
        $(document).on('click', '.modal-download-btn', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const pdfUrl = $(this).attr('href');
            let pdfTitle = 'Document Preview';

            // Custom title for Resume
            if ($(this).attr('id') === 'resume-btn' || $(this).text().includes('Resume')) {
                pdfTitle = 'Curriculum Vitae - Walid Saadaoui';
            } else {
                const projectTitle = $('#modal-title').text();
                pdfTitle = projectTitle ? projectTitle + ' - Case Study' : 'Case Study Preview';
            }

            // Convert Google Drive view URL to preview URL
            let previewUrl = pdfUrl;
            if (pdfUrl.includes('drive.google.com')) {
                previewUrl = pdfUrl.replace('/view?usp=sharing', '/preview')
                    .replace('/view', '/preview');
            }

            // Set modal content
            pdfModalTitle.text(pdfTitle);
            pdfIframe.attr('src', previewUrl);
            pdfDownloadLink.attr('href', pdfUrl);

            // Show loading state
            $('.pdf-preview-container').addClass('loading');

            // Show modal
            pdfModal.addClass('active');
            $('body').css('overflow', 'hidden');

            // Remove loading state when iframe loads
            pdfIframe.on('load', function () {
                $('.pdf-preview-container').removeClass('loading');
            });
        });

        // Close modal when clicking X
        closePdfModal.on('click', function () {
            closePDFModal();
        });

        // Close modal when clicking outside
        pdfModal.on('click', function (e) {
            if ($(e.target).is(pdfModal)) {
                closePDFModal();
            }
        });

        // Close modal with ESC key
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && pdfModal.hasClass('active')) {
                closePDFModal();
            }
        });

        // Function to close PDF modal
        function closePDFModal() {
            pdfModal.removeClass('active');
            $('body').css('overflow', 'auto');

            // Clear iframe source to stop loading
            setTimeout(function () {
                pdfIframe.attr('src', '');
            }, 300);
        }
    });

})();
