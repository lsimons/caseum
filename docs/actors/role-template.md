<!--suppress HtmlDeprecatedAttribute, CheckImageSize -->
# Describing actors with a role description

**Keep a short, clear list of actor role descriptions.**

Caseum is for designing a software system, not the organization that uses the system. Keep descriptions of actors simple: do not model the human structure of the organization in great detail.

## Role description markdown template

Here's a markdown template for capturing roles:

```markdown
<img alt="icon for an actor" src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/user.svg" width="30" align="left" style="margin-right: 20px">

### Role: {role name}
{Short role description.}

**Goals and needs:** {short goals and needs description.}

**Responsibilities:**
* {Short responsibility description #1.}
* {Short responsibility description #2.}
* {Short responsibility description #3.}
```

Do not write a complete list of goals, needs and responsibilities. Focus only on the information that influences how they will use the software, plus perhaps some basic info that helps everyone understand the nature of the role.

## Role examples:

Here are some example role descriptions:

<img alt="icon for an actor" src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/user-doctor.svg" width="30" align="left" style="margin-right: 20px;">

### Role: veterinarian
Medical professional who cares for animals at the Pet Clinic. "Vet" for short.

**Goals and needs:** Needs to take care of pets that visit the Pet Clinic. Also needs to talk to the pet owner during such visits. Wants to have an optimal schedule of appointments and to be prepared for those appointments.

**Responsibilities:**
* Check their appointment schedule
* Look up key information before or during an appointment
* Save key medical information about a pet during or right after an appointment

<img alt="icon for an actor" src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/user.svg" width="30" align="left" style="margin-right: 20px;">

### Role: pet clinic receptionist
Professional with an administrative support role in the Pet Clinic. "Receptionist" for short.

**Goals and needs:** Needs to ensure the smooth running of the Pet Clinic. Wants to welcome pet owners and their pets and support the vet in their work, for which they manage the Pet Clinic schedule.

**Responsibilities:**
* Answer the phone
* Welcome pet owners and pets during visits
* Manage the appointment schedule
* Plan and re-plan appointments
* Remind pet owners of upcoming appointments
* Schedule recurring check-in appointments

<img alt="icon for an actor" src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/user.svg" width="30" align="left" style="margin-right: 20px;">

### Role: pet owner (non-actor)
Pet owners interact with the receptionist and the vet but not the Pet Clinic admin system.

**Goals and needs:** Needs to take care of their pet.
