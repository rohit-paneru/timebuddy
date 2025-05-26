/**
 * Study Groups Module
 * Enables virtual study group coordination and collaborative learning
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const studyGroupsContainer = document.getElementById(
    "study-groups-container"
  );
  const createGroupBtn = document.getElementById("createGroupBtn");
  const groupForm = document.getElementById("group-form");
  const groupNameInput = document.getElementById("group-name-input");
  const groupDescInput = document.getElementById("group-desc-input");
  const groupTopicInput = document.getElementById("group-topic-input");
  const groupDateInput = document.getElementById("group-date-input");
  const groupTimeInput = document.getElementById("group-time-input");
  const groupDurationInput = document.getElementById("group-duration-input");
  const groupCapacityInput = document.getElementById("group-capacity-input");
  const groupsList = document.getElementById("groups-list");
  const myGroupsList = document.getElementById("my-groups-list");
  const groupDetailsModal = document.getElementById("group-details-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  // State variables
  let studyGroups = [];
  let currentUser = {
    id: generateUserId(),
    name: localStorage.getItem("userName") || "Anonymous Student",
  };
  let currentGroupId = null;

  // Initialize the study groups module
  function initStudyGroups() {
    // Load saved study groups
    loadStudyGroups();

    // Check if user name is set
    checkUserName();

    // Render study groups
    renderStudyGroups();
    renderMyGroups();
  }

  // Check if user name is set, prompt if not
  function checkUserName() {
    if (!localStorage.getItem("userName")) {
      const userName = prompt(
        "Please enter your name for study groups:",
        "Anonymous Student"
      );
      if (userName && userName.trim() !== "") {
        localStorage.setItem("userName", userName.trim());
        currentUser.name = userName.trim();
      }
    }
  }

  // Generate a unique user ID if not already set
  function generateUserId() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", userId);
    }
    return userId;
  }

  // Load study groups from localStorage
  function loadStudyGroups() {
    const savedGroups = localStorage.getItem("studyGroups");
    if (savedGroups) {
      studyGroups = JSON.parse(savedGroups);
    }
  }

  // Save study groups to localStorage
  function saveStudyGroups() {
    localStorage.setItem("studyGroups", JSON.stringify(studyGroups));
  }

  // Create a new study group
  function createStudyGroup(event) {
    if (event) {
      event.preventDefault();
    }

    if (
      !groupNameInput ||
      !groupTopicInput ||
      !groupDateInput ||
      !groupTimeInput
    )
      return;

    const name = groupNameInput.value.trim();
    const description = groupDescInput ? groupDescInput.value.trim() : "";
    const topic = groupTopicInput.value.trim();
    const date = groupDateInput.value;
    const time = groupTimeInput.value;
    const duration = groupDurationInput
      ? parseInt(groupDurationInput.value) || 60
      : 60;
    const capacity = groupCapacityInput
      ? parseInt(groupCapacityInput.value) || 5
      : 5;

    if (!name || !topic || !date || !time) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new group object
    const newGroup = {
      id: Date.now(),
      name,
      description,
      topic,
      date,
      time,
      duration,
      capacity,
      creator: {
        id: currentUser.id,
        name: currentUser.name,
      },
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: "creator",
        },
      ],
      messages: [],
      resources: [],
      createdAt: new Date().toISOString(),
    };

    // Add to groups array
    studyGroups.push(newGroup);

    // Save to localStorage
    saveStudyGroups();

    // Reset form
    if (groupForm) {
      groupForm.reset();
    }

    // Re-render groups
    renderStudyGroups();
    renderMyGroups();

    // Show success message
    alert("Study group created successfully!");
  }

  // Render all available study groups
  function renderStudyGroups() {
    if (!groupsList) return;

    // Clear existing groups
    groupsList.innerHTML = "";

    if (studyGroups.length === 0) {
      groupsList.innerHTML = `
        <div class="text-center p-6 text-stone-500">
          <p>No study groups available. Create a new group to get started!</p>
        </div>
      `;
      return;
    }

    // Sort groups by date (upcoming first)
    const sortedGroups = [...studyGroups].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    // Filter out past groups
    const now = new Date();
    const upcomingGroups = sortedGroups.filter((group) => {
      const groupDate = new Date(`${group.date}T${group.time}`);
      return groupDate >= now;
    });

    // Create group cards
    upcomingGroups.forEach((group) => {
      const groupCard = createGroupCard(group);
      groupsList.appendChild(groupCard);
    });
  }

  // Render user's joined groups
  function renderMyGroups() {
    if (!myGroupsList) return;

    // Clear existing groups
    myGroupsList.innerHTML = "";

    // Filter groups where user is a member
    const myGroups = studyGroups.filter((group) =>
      group.members.some((member) => member.id === currentUser.id)
    );

    if (myGroups.length === 0) {
      myGroupsList.innerHTML = `
        <div class="text-center p-6 text-stone-500">
          <p>You haven't joined any study groups yet.</p>
        </div>
      `;
      return;
    }

    // Sort groups by date (upcoming first)
    const sortedGroups = [...myGroups].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    // Create group cards
    sortedGroups.forEach((group) => {
      const groupCard = createGroupCard(group, true);
      myGroupsList.appendChild(groupCard);
    });
  }

  // Create a group card element
  function createGroupCard(group, isMyGroup = false) {
    const groupCard = document.createElement("div");
    groupCard.className =
      "bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow";

    // Check if user is a member
    const isMember = group.members.some(
      (member) => member.id === currentUser.id
    );

    // Format date and time
    const groupDateTime = new Date(`${group.date}T${group.time}`);
    const formattedDate = groupDateTime.toLocaleDateString();
    const formattedTime = groupDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Calculate spots left
    const spotsLeft = group.capacity - group.members.length;

    groupCard.innerHTML = `
      <div class="p-4 bg-sky-50 border-b border-stone-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-sky-800">${group.name}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full ${
            spotsLeft > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }">${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left</span>
        </div>
      </div>
      <div class="p-4">
        <p class="text-sm text-stone-600 mb-3">${
          group.description || "No description provided."
        }</p>
        <div class="grid grid-cols-2 gap-2 mb-3">
          <div>
            <span class="text-xs text-stone-500">Topic:</span>
            <p class="text-sm font-medium">${group.topic}</p>
          </div>
          <div>
            <span class="text-xs text-stone-500">Created by:</span>
            <p class="text-sm font-medium">${group.creator.name}</p>
          </div>
          <div>
            <span class="text-xs text-stone-500">Date & Time:</span>
            <p class="text-sm font-medium">${formattedDate}, ${formattedTime}</p>
          </div>
          <div>
            <span class="text-xs text-stone-500">Duration:</span>
            <p class="text-sm font-medium">${group.duration} minutes</p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button class="view-group-btn text-sky-600 hover:text-sky-800 text-sm font-medium" data-id="${
            group.id
          }">
            View Details
          </button>
          ${
            !isMember && spotsLeft > 0
              ? `
            <button class="join-group-btn bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium py-1 px-3 rounded transition" data-id="${group.id}">
              Join Group
            </button>
          `
              : isMember
              ? `
            <button class="leave-group-btn bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition" data-id="${group.id}">
              Leave Group
            </button>
          `
              : `
            <span class="text-xs text-red-600">Group is full</span>
          `
          }
        </div>
      </div>
    `;

    // Add event listeners
    const viewBtn = groupCard.querySelector(".view-group-btn");
    if (viewBtn) {
      viewBtn.addEventListener("click", function () {
        viewGroupDetails(group.id);
      });
    }

    const joinBtn = groupCard.querySelector(".join-group-btn");
    if (joinBtn) {
      joinBtn.addEventListener("click", function () {
        joinGroup(group.id);
      });
    }

    const leaveBtn = groupCard.querySelector(".leave-group-btn");
    if (leaveBtn) {
      leaveBtn.addEventListener("click", function () {
        leaveGroup(group.id);
      });
    }

    return groupCard;
  }

  // View group details
  function viewGroupDetails(groupId) {
    const group = studyGroups.find((g) => g.id === parseInt(groupId));
    if (!group || !groupDetailsModal) return;

    currentGroupId = groupId;

    // Format date and time
    const groupDateTime = new Date(`${group.date}T${group.time}`);
    const formattedDate = groupDateTime.toLocaleDateString();
    const formattedTime = groupDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check if user is a member
    const isMember = group.members.some(
      (member) => member.id === currentUser.id
    );
    const isCreator = group.creator.id === currentUser.id;

    // Calculate spots left
    const spotsLeft = group.capacity - group.members.length;

    // Update modal content
    const modalContent = groupDetailsModal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="p-4 bg-sky-50 border-b border-stone-200">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-sky-800">${group.name}</h3>
            <button id="close-modal-btn" class="text-stone-500 hover:text-stone-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <p class="text-stone-600 mb-4">${
            group.description || "No description provided."
          }</p>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span class="text-xs text-stone-500">Topic:</span>
              <p class="text-sm font-medium">${group.topic}</p>
            </div>
            <div>
              <span class="text-xs text-stone-500">Created by:</span>
              <p class="text-sm font-medium">${group.creator.name}</p>
            </div>
            <div>
              <span class="text-xs text-stone-500">Date & Time:</span>
              <p class="text-sm font-medium">${formattedDate}, ${formattedTime}</p>
            </div>
            <div>
              <span class="text-xs text-stone-500">Duration:</span>
              <p class="text-sm font-medium">${group.duration} minutes</p>
            </div>
            <div>
              <span class="text-xs text-stone-500">Capacity:</span>
              <p class="text-sm font-medium">${group.members.length}/${
        group.capacity
      } members</p>
            </div>
            <div>
              <span class="text-xs text-stone-500">Status:</span>
              <p class="text-sm font-medium ${
                spotsLeft > 0 ? "text-green-600" : "text-red-600"
              }">
                ${spotsLeft > 0 ? "Open" : "Full"}
              </p>
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-lg font-medium text-sky-700 mb-2">Members</h4>
            <ul class="bg-stone-50 rounded-lg p-3">
              ${group.members
                .map(
                  (member) => `
                <li class="flex justify-between items-center py-1 ${
                  member.id === currentUser.id ? "font-medium" : ""
                }">
                  <span>${member.name} ${
                    member.role === "creator" ? "(Creator)" : ""
                  }</span>
                  ${
                    isCreator && member.id !== currentUser.id
                      ? `
                    <button class="remove-member-btn text-red-600 hover:text-red-800 text-xs" data-id="${member.id}">
                      Remove
                    </button>
                  `
                      : ""
                  }
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
          
          ${
            isMember
              ? `
            <div class="mb-6">
              <h4 class="text-lg font-medium text-sky-700 mb-2">Group Chat</h4>
              <div class="bg-stone-50 rounded-lg p-3 h-48 overflow-y-auto mb-3" id="group-chat">
                ${
                  group.messages.length > 0
                    ? group.messages
                        .map(
                          (message) => `
                  <div class="mb-2 ${
                    message.sender.id === currentUser.id ? "text-right" : ""
                  }">
                    <div class="inline-block max-w-xs px-3 py-2 rounded-lg ${
                      message.sender.id === currentUser.id
                        ? "bg-sky-100 text-sky-800"
                        : "bg-stone-200 text-stone-800"
                    }">
                      <p class="text-sm">${message.text}</p>
                    </div>
                    <div class="text-xs text-stone-500 mt-1">
                      ${message.sender.name} • ${new Date(
                            message.timestamp
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                    </div>
                  </div>
                `
                        )
                        .join("")
                    : `
                  <p class="text-center text-stone-500 text-sm py-4">No messages yet. Start the conversation!</p>
                `
                }
              </div>
              <div class="flex">
                <input type="text" id="message-input" class="flex-1 border border-stone-300 rounded-l-lg px-3 py-2" placeholder="Type your message...">
                <button id="send-message-btn" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-lg transition">
                  Send
                </button>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-lg font-medium text-sky-700 mb-2">Resources</h4>
              <div class="bg-stone-50 rounded-lg p-3 mb-3">
                ${
                  group.resources.length > 0
                    ? `
                  <ul class="divide-y divide-stone-200">
                    ${group.resources
                      .map(
                        (resource) => `
                      <li class="py-2 flex justify-between items-center">
                        <div>
                          <a href="${
                            resource.url
                          }" target="_blank" class="text-sky-600 hover:text-sky-800 font-medium">
                            ${resource.title}
                          </a>
                          <p class="text-xs text-stone-500">Added by ${
                            resource.addedBy.name
                          }</p>
                        </div>
                        ${
                          resource.addedBy.id === currentUser.id || isCreator
                            ? `
                          <button class="remove-resource-btn text-red-600 hover:text-red-800 text-xs" data-id="${resource.id}">
                            Remove
                          </button>
                        `
                            : ""
                        }
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                `
                    : `
                  <p class="text-center text-stone-500 text-sm py-4">No resources shared yet.</p>
                `
                }
              </div>
              <div class="flex">
                <input type="text" id="resource-title-input" class="w-1/3 border border-stone-300 rounded-l-lg px-3 py-2" placeholder="Resource title">
                <input type="text" id="resource-url-input" class="w-2/3 border-y border-r border-stone-300 px-3 py-2" placeholder="URL (https://...)">
                <button id="add-resource-btn" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-lg transition">
                  Add
                </button>
              </div>
            </div>
          `
              : ""
          }
          
          <div class="flex justify-between">
            ${
              !isMember && spotsLeft > 0
                ? `
              <button id="join-group-modal-btn" class="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded transition">
                Join Group
              </button>
            `
                : isMember && !isCreator
                ? `
              <button id="leave-group-modal-btn" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition">
                Leave Group
              </button>
            `
                : isCreator
                ? `
              <button id="delete-group-btn" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition">
                Delete Group
              </button>
            `
                : `
              <span class="text-red-600">Group is full</span>
            `
            }
            <button id="close-modal-btn-bottom" class="bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium py-2 px-4 rounded transition">
              Close
            </button>
          </div>
        </div>
      `;

      // Show modal
      groupDetailsModal.classList.remove("hidden");

      // Add event listeners
      const closeModalBtns = groupDetailsModal.querySelectorAll(
        "#close-modal-btn, #close-modal-btn-bottom"
      );
      closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", closeModal);
      });

      const joinGroupModalBtn = groupDetailsModal.querySelector(
        "#join-group-modal-btn"
      );
      if (joinGroupModalBtn) {
        joinGroupModalBtn.addEventListener("click", function () {
          joinGroup(groupId);
          closeModal();
        });
      }

      const leaveGroupModalBtn = groupDetailsModal.querySelector(
        "#leave-group-modal-btn"
      );
      if (leaveGroupModalBtn) {
        leaveGroupModalBtn.addEventListener("click", function () {
          leaveGroup(groupId);
          closeModal();
        });
      }

      const deleteGroupBtn =
        groupDetailsModal.querySelector("#delete-group-btn");
      if (deleteGroupBtn) {
        deleteGroupBtn.addEventListener("click", function () {
          deleteGroup(groupId);
          closeModal();
        });
      }

      const sendMessageBtn =
        groupDetailsModal.querySelector("#send-message-btn");
      const messageInput = groupDetailsModal.querySelector("#message-input");
      if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener("click", function () {
          sendMessage(groupId, messageInput.value);
          messageInput.value = "";
        });

        messageInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            sendMessage(groupId, messageInput.value);
            messageInput.value = "";
          }
        });
      }

      const addResourceBtn =
        groupDetailsModal.querySelector("#add-resource-btn");
      const resourceTitleInput = groupDetailsModal.querySelector(
        "#resource-title-input"
      );
      const resourceUrlInput = groupDetailsModal.querySelector(
        "#resource-url-input"
      );
      if (addResourceBtn && resourceTitleInput && resourceUrlInput) {
        addResourceBtn.addEventListener("click", function () {
          addResource(
            groupId,
            resourceTitleInput.value,
            resourceUrlInput.value
          );
          resourceTitleInput.value = "";
          resourceUrlInput.value = "";
        });
      }

      const removeResourceBtns = groupDetailsModal.querySelectorAll(
        ".remove-resource-btn"
      );
      removeResourceBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          removeResource(groupId, btn.dataset.id);
        });
      });

      const removeMemberBtns =
        groupDetailsModal.querySelectorAll(".remove-member-btn");
      removeMemberBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          removeMember(groupId, btn.dataset.id);
        });
      });
    }
  }

  // Close the modal
  function closeModal() {
    if (groupDetailsModal) {
      groupDetailsModal.classList.add("hidden");
      currentGroupId = null;
    }
  }

  // Join a study group
  function joinGroup(groupId) {
    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is already a member
    if (group.members.some((member) => member.id === currentUser.id)) {
      alert("You are already a member of this group");
      return;
    }

    // Check if group is full
    if (group.members.length >= group.capacity) {
      alert("This group is already full");
      return;
    }

    // Add user to members
    group.members.push({
      id: currentUser.id,
      name: currentUser.name,
      role: "member",
      joinedAt: new Date().toISOString(),
    });

    // Add system message
    group.messages.push({
      id: Date.now(),
      text: `${currentUser.name} has joined the group`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date().toISOString(),
      type: "system",
    });

    // Save changes
    saveStudyGroups();

    // Re-render groups
    renderStudyGroups();
    renderMyGroups();

    // Show success message
    alert("You have successfully joined the group!");
  }

  // Leave a study group
  function leaveGroup(groupId) {
    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is a member
    if (!group.members.some((member) => member.id === currentUser.id)) {
      alert("You are not a member of this group");
      return;
    }

    // Check if user is the creator
    if (group.creator.id === currentUser.id) {
      alert(
        "As the creator, you cannot leave the group. You can delete it instead."
      );
      return;
    }

    // Remove user from members
    group.members = group.members.filter(
      (member) => member.id !== currentUser.id
    );

    // Add system message
    group.messages.push({
      id: Date.now(),
      text: `${currentUser.name} has left the group`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date().toISOString(),
      type: "system",
    });

    // Save changes
    saveStudyGroups();

    // Re-render groups
    renderStudyGroups();
    renderMyGroups();

    // Show success message
    alert("You have left the group");
  }

  // Delete a study group (creator only)
  function deleteGroup(groupId) {
    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is the creator
    if (group.creator.id !== currentUser.id) {
      alert("Only the creator can delete the group");
      return;
    }

    // Confirm deletion
    if (
      !confirm(`Are you sure you want to delete the group "${group.name}"?`)
    ) {
      return;
    }

    // Remove group
    studyGroups.splice(groupIndex, 1);

    // Save changes
    saveStudyGroups();

    // Re-render groups
    renderStudyGroups();
    renderMyGroups();

    // Show success message
    alert("Group has been deleted");
  }

  // Send a message in the group chat
  function sendMessage(groupId, messageText) {
    if (!messageText || messageText.trim() === "") return;

    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is a member
    if (!group.members.some((member) => member.id === currentUser.id)) {
      alert("You must be a member to send messages");
      return;
    }

    // Add message
    group.messages.push({
      id: Date.now(),
      text: messageText.trim(),
      sender: {
        id: currentUser.id,
        name: currentUser.name,
      },
      timestamp: new Date().toISOString(),
      type: "user",
    });

    // Save changes
    saveStudyGroups();

    // Update chat display
    const groupChat = document.getElementById("group-chat");
    if (groupChat) {
      const message = group.messages[group.messages.length - 1];
      const messageElement = document.createElement("div");
      messageElement.className = `mb-2 ${
        message.sender.id === currentUser.id ? "text-right" : ""
      }`;
      messageElement.innerHTML = `
        <div class="inline-block max-w-xs px-3 py-2 rounded-lg ${
          message.sender.id === currentUser.id
            ? "bg-sky-100 text-sky-800"
            : "bg-stone-200 text-stone-800"
        }">
          <p class="text-sm">${message.text}</p>
        </div>
        <div class="text-xs text-stone-500 mt-1">
          ${message.sender.name} • ${new Date(
        message.timestamp
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      `;
      groupChat.appendChild(messageElement);

      // Scroll to bottom
      groupChat.scrollTop = groupChat.scrollHeight;
    }
  }

  // Add a resource to the group
  function addResource(groupId, title, url) {
    if (!title || title.trim() === "" || !url || url.trim() === "") {
      alert("Please enter both a title and URL for the resource");
      return;
    }

    // Validate URL
    if (!url.match(/^https?:\/\/.+/)) {
      url = "https://" + url;
    }

    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is a member
    if (!group.members.some((member) => member.id === currentUser.id)) {
      alert("You must be a member to add resources");
      return;
    }

    // Add resource
    group.resources.push({
      id: Date.now(),
      title: title.trim(),
      url: url.trim(),
      addedBy: {
        id: currentUser.id,
        name: currentUser.name,
      },
      addedAt: new Date().toISOString(),
    });

    // Add system message
    group.messages.push({
      id: Date.now(),
      text: `${currentUser.name} added a resource: ${title.trim()}`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date().toISOString(),
      type: "system",
    });

    // Save changes
    saveStudyGroups();

    // Refresh modal
    viewGroupDetails(groupId);
  }

  // Remove a resource from the group
  function removeResource(groupId, resourceId) {
    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];
    const resourceIndex = group.resources.findIndex(
      (r) => r.id === parseInt(resourceId)
    );

    if (resourceIndex === -1) return;

    const resource = group.resources[resourceIndex];

    // Check if user is the creator or the one who added the resource
    if (
      group.creator.id !== currentUser.id &&
      resource.addedBy.id !== currentUser.id
    ) {
      alert("You can only remove resources that you added");
      return;
    }

    // Remove resource
    group.resources.splice(resourceIndex, 1);

    // Add system message
    group.messages.push({
      id: Date.now(),
      text: `${currentUser.name} removed a resource: ${resource.title}`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date().toISOString(),
      type: "system",
    });

    // Save changes
    saveStudyGroups();

    // Refresh modal
    viewGroupDetails(groupId);
  }

  // Remove a member from the group (creator only)
  function removeMember(groupId, memberId) {
    const groupIndex = studyGroups.findIndex((g) => g.id === parseInt(groupId));
    if (groupIndex === -1) return;

    const group = studyGroups[groupIndex];

    // Check if user is the creator
    if (group.creator.id !== currentUser.id) {
      alert("Only the creator can remove members");
      return;
    }

    const memberIndex = group.members.findIndex((m) => m.id === memberId);
    if (memberIndex === -1) return;

    const member = group.members[memberIndex];

    // Confirm removal
    if (
      !confirm(`Are you sure you want to remove ${member.name} from the group?`)
    ) {
      return;
    }

    // Remove member
    group.members.splice(memberIndex, 1);

    // Add system message
    group.messages.push({
      id: Date.now(),
      text: `${member.name} has been removed from the group by ${currentUser.name}`,
      sender: {
        id: "system",
        name: "System",
      },
      timestamp: new Date().toISOString(),
      type: "system",
    });

    // Save changes
    saveStudyGroups();

    // Refresh modal
    viewGroupDetails(groupId);
  }

  // Event listeners
  if (createGroupBtn && groupForm) {
    groupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      createStudyGroup();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (groupDetailsModal && e.target === groupDetailsModal) {
      closeModal();
    }
  });

  // Initialize on load
  if (studyGroupsContainer) {
    initStudyGroups();
  }

  // Expose functions to global scope for other modules
  window.createStudyGroup = createStudyGroup;
  window.joinGroup = joinGroup;
  window.leaveGroup = leaveGroup;
});
